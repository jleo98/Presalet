import { useState,useEffect } from 'react';

import {
  Box,
  Button,
  Layer,
  Text,
  Spinner
} from 'grommet';


import { fromString } from 'uint8arrays'

import styled from "styled-components";
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';
import  useOrbis  from '../hooks/useOrbis';

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';



const StyledLayerBuy = styled(Layer)`
  border: 1px solid var(--lines);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 15px #00000054;
  border: 1px solid #E5E8EB;
  border-radius: 15px;
  opacity: 1;
  width: 355px;
  height: 447px;
`;


export default function BuySection(props) {

  const { state } = useAppContext();
  const { connectSeed,addWallet,isUnderVerification } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Stablecoin");
  const [show,setShow] = useState();
  const [underVerification,setUnderVerification] = useState()

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
      const goldListWithSigner = state.goldList.connect(signer);
      tx = await goldListWithSigner.claimTokensWithStable(busd.address, amount);
    }

    await tx.wait();

  }


  const getExpectedSrg = async (total) => {
    const amount = await state.goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  useEffect(() => {
    let seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED_NOKYC, 'base16'));
    if(state.netId === 56){
      seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED_NOKYC_BSC, 'base16'));
    }
    connectSeed(seed);
  },[state.netId])

  useEffect(() => {
    setUnderVerification()
  },[state.coinbase])

  useEffect(() => {
    if(!underVerification){
      isUnderVerification(state.coinbase).then(newUnderVerification => {
        setUnderVerification(newUnderVerification)
      })
    }
  },[
    underVerification,
    state.coinbase
  ])



  return (
    <Box margin={{horizontal: "30%"}} >
    {
      !state.coinbase &&
      <Box pad={{bottom: "xlarge"}}>
        <Button primary style={{borderRadius: "8px"}} color="#ffcc00" size="large" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" />
      </Box>
    }
    {
      state.coinbase &&
      <>
      {
        !state.whitelisted ?
        (
          !underVerification ?
          <Box pad={{bottom:"xlarge"}}>
            <Button primary color="#ffcc00" size="large" className="btn-primary" style={{borderRadius: "8px"}} onClick={async () => {
              const stableBalance = await state.getStablecoinsBalance();
              if(stableBalance >= 300){
                setUnderVerification(true)
                await addWallet(state.coinbase,true);
              } else {
                alert("Insufficient usd")
              }

            }} label="WhiteList Me" style={{borderRadius: "8px"}} />
          </Box> :
          <Box pad={{top:"xlarge"}} align="center">
            <Spinner size="medium" color="white"/>
            <Text size="medium" color="white">Being whitelisted</Text>
            <Text size="xsmall" color="white">It can take up to 2 minutes</Text>
          </Box>
        ):
        show ?
        <StyledLayerBuy
          onEsc={() => {
            setShow(false);
          }}
          onClickOutside={() => {
            setShow(false);
          }}
        >
        <Box align="left" pad="medium">
            <Text style={{
             textAlign: "left",
             font: "normal normal 600 20px/40px Poppins",
             letterSpacing: "0px",
             color: "black",
             opacity: 1,
             paddingBottom: "20px"
           }}>Payment method</Text>
           <Stablecoins
             provider={state.provider}
             setBusd={setBusd}
             busd={busd}
           />
        </Box>

          {
            (
              value === "Native" ||
              (
                value === "Stablecoin" && busd
              )
            ) &&
            <GoldListModal
              value={value}
              busd={busd}
              buyTokens={buyTokens}
              getExpectedSrg={getExpectedSrg}
            />
          }
        </StyledLayerBuy> :
        Number(state.goldListBalance) > 0 ?
        <Box  pad={{bottom:"xlarge"}}>
          <Button primary size="large" color="#ffcc00" className="btn-primary" style={{borderRadius: "8px"}} onClick={() => setShow(true)} label="Buy SRG" />
        </Box> :
        <Text size="medium" color="white">Sale ended</Text>
      }
      </>
    }

    </Box>
  )
}
