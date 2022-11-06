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

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';


import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.6;
  font: normal normal bold Poppins;

`;

export default function BuySection(props) {

  const { state } = useAppContext();

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
      state.coinbase &&
      <>
      {
        !state.whitelisted ?
        <Box >
          <Button primary color="#ffcc00" size="large" className="btn-primary" onClick={() => {
            // DEFINE NECESSARY PARAMETERS
            const url = process.env.REACT_APP_URL
            createVeriffFrame({
              url,
              onEvent: function(msg) {
                switch(msg) {
                  case MESSAGES.STARTED:
                    // session status changed to 'started'.
                    break;
                  case MESSAGES.CANCELED:
                    //user closed the modal.
                    break;
                  case MESSAGES.FINISHED:
                    // user finished verification flow.
                    break;
                }
              }
            })
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
    </Box>
  )
}
