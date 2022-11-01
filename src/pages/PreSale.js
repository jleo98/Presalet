import { useState, useEffect, useMemo } from 'react';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import {
  Box,
  RadioButtonGroup,
  Layer,
  Text,
  Anchor
} from 'grommet';
import { ethers } from "ethers";
//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';



import { useAppContext } from '../hooks/useAppState';


import Banner from '../components/Banner';
import GoldListModal from '../components/GoldListModal';
import Stablecoins from '../components/Stablecoins';

import abis from "../contracts/abis";
import addresses from "../contracts/addresses";

export default function PreSale() {

  const { state } = useAppContext();

  const [srg, setSrg] = useState();
  const [goldList, setGoldList] = useState();
  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Native");

  const buyTokens = async (total) => {
    const signer = state.provider.getSigner();
    const goldListWithSigner = state.goldList.connect(signer);
    const amount = ethers.utils.parseEther(total).toString()
    let tx;
    if (value === "Native") {
      tx = await goldListWithSigner.claimTokensWithNative({
        value: amount
      });
    } else {
      const allowance = await busd.allowance(state.coinbase, state.goldList.address);
      if (amount > allowance) {
        const busdWithSigner = busd.connect(signer);
        const txApproval = await busdWithSigner.approve(state.goldList.address, amount);
        await txApproval.wait();
      }
      const goldListWithSigner = goldList.connect(signer);
      tx = await goldListWithSigner.claimTokensWithStable(busd.address, amount);
    }

    await tx.wait();

  }


  const getExpectedSrg = async (total) => {
    const amount = await state.goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  return (
    <>
    <Banner />
    {
      state.coinbase &&
      <Box align="center" pad="medium">
        <RadioButtonGroup
          name="payment"
          options={['Native', 'Stablecoin']}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    }
    {
      state.coinbase &&
      state.stablecoins &&
      value === "Stablecoin" &&
      <Stablecoins
        provider={state.provider}
        setBusd={setBusd}
      />
    }
    {
      state.coinbase &&
      (
        value === "Native" ||
        (
          value === "Stablecoin" && busd
        )
      ) &&
      <GoldListModal
        value={value}
        buyTokens={buyTokens}
        getExpectedSrg={getExpectedSrg}
      />
    }
    </>
  )
}
