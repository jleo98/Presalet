import { useState } from 'react';

import {
  Box,
  Button,
  Layer,
  Paragraph,
  Heading,
  Text,
  Anchor,
  RadioButtonGroup,
  Image
} from 'grommet';

import Countdown from "react-countdown";


import styled from "styled-components";
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';
import  useOrbis  from '../hooks/useOrbis';

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';


import { Veriff } from '@veriff/js-sdk';

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.6;
  font: normal normal bold Poppins;

`;

export default function BuySection(props) {

  const { state } = useAppContext();
  const { addWallet } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Native");
  const [show,setShow] = useState();
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

  return (
    <Box margin={{horizontal: "30%"}}>
    {
      !state.coinbase &&
        <Button primary color="#ffcc00" size="large" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" />
    }
    {
      state.coinbase &&
      <>
      {
        !state.whitelisted ?
        <Box >
          <Button primary color="#ffcc00" size="large" className="btn-primary" onClick={async () => {
            // DEFINE NECESSARY PARAMETERS
            addWallet(state.coinbase) // Testing


            const veriff = Veriff({
              apiKey: 'API_KEY',
              parentId: 'veriff-root',
              onSession: function(err, response) {
                // received the response, verification can be started / triggered now
                console.log(response)
                if(response === "FINISHED"){
                  addWallet(state.coinbase)
                }
              }
            });
            

          }} label="Verify" />
          <Box pad={{top:"small"}} align="center">
            <Text size="xsmall" color="white">Powered by</Text>
            <Image src={require("../assets/veriff.png")} style={{width:"100px"}}/>
          </Box>
        </Box> :
        show ?
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" pad="medium">
            <Text>Payment method</Text>
            <RadioButtonGroup
              name="payment"
              options={['Native', 'Stablecoin']}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Box>
          {
            state.stablecoins &&
            value === "Stablecoin" &&
            <Stablecoins
              provider={state.provider}
              setBusd={setBusd}
              busd={busd}
            />
          }
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
        </Layer> :
        <Button primary size="large" color="#ffcc00" className="btn-primary" onClick={() => setShow(true)} label="Buy" />
      }
      </>
    }
    <div id='veriff-root'></div>
    </Box>
  )
}
