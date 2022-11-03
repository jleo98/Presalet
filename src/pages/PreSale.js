import { useState } from 'react';


import {
  Box,
  RadioButtonGroup,
  Button
} from 'grommet';
import { ethers } from "ethers";
//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';



import { useAppContext } from '../hooks/useAppState';


import Banner from '../components/Banner';
import GoldListModal from '../components/GoldListModal';
import Stablecoins from '../components/Stablecoins';


export default function PreSale() {

  const { state } = useAppContext();

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
    <>
    <Banner />
    {
      state.coinbase &&
      <>
      {
        !state.whitelisted ?
        <Box align="center" pad="medium">
          <Button primary color="#ffcc00" className="btn-primary" onClick={() => {
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
        </Box> :
        <>
        <Box align="center" pad="medium">
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
        </>
      }
      </>
    }
    </>
  )
}
