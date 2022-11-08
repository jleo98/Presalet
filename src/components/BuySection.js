import { useState,useEffect } from 'react';

import {
  Box,
  Button,
  Layer,
  Paragraph,
  Heading,
  Text,
  Anchor,
  RadioButtonGroup,
  Image,
  Spinner
} from 'grommet';

import Countdown from "react-countdown";


import styled from "styled-components";
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';
import  useOrbis  from '../hooks/useOrbis';

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';
import VeriffLayer from './VeriffLayer';


const StyledText = styled(Text)`
  font-weight: 600;
  line-height: 1.6;
  font: normal normal bold Poppins;

`;

export default function BuySection(props) {

  const { state } = useAppContext();
  const { addWallet,isUnderVerification } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Native");
  const [show,setShow] = useState();
  const [showVeriff,setShowVeriff] = useState();
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
    if(state.coinbase){
      isUnderVerification(state.coinbase).then(newUnderVerification => {
        setUnderVerification(newUnderVerification)
      })
      setInterval(() => {
        if(!underVerification){
          isUnderVerification(state.coinbase).then(newUnderVerification => {
            setUnderVerification(newUnderVerification)
          })
        }
      },1000)
    }
  },[state.coinbase])

  return (
    <Box margin={{horizontal: "30%"}} height="small">
    {
      !state.coinbase &&
        <Button primary color="#ffcc00" size="large" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" />
    }
    {
      state.coinbase &&
      <>
      {
        !state.whitelisted ?
        (
          !underVerification ?
          <Box>
            <Button primary color="#ffcc00" size="large" className="btn-primary" onClick={() => {
              setShowVeriff(true);
            }} label="Verify" />
            <Box pad={{top:"small"}} align="center">
              <Text size="xsmall" color="white">Powered by</Text>
              <Anchor href="https://www.veriff.com/" target="_blank">
                <Image src={require("../assets/veriff.png")} style={{width:"100px"}}/>
              </Anchor>
            </Box>
          </Box> :
          <Box pad={{top:"small"}} align="center">
            <Spinner size="medium" color="white"/>
            <Text size="medium" color="white">Under verification</Text>
          </Box>
        ):
        show ?
        <Layer
          onEsc={() => {
            setShow(false);
          }}
          onClickOutside={() => {
            setShow(false);
          }}
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
        Number(state.goldListBalance) > 0 ?
        <Button primary size="large" color="#ffcc00" className="btn-primary" onClick={() => setShow(true)} label="Buy" /> :
        <Text size="medium" color="white">Sale ended</Text>
      }
      </>
    }
    {
      showVeriff &&
      <Layer
        onEsc={() => {
          isUnderVerification(state.coinbase).then(newUnderVerification => {
            setUnderVerification(newUnderVerification)
          })
          setShowVeriff(false)
        }}
        onClickOutside={() => {
          isUnderVerification(state.coinbase).then(newUnderVerification => {
            setUnderVerification(newUnderVerification)
          })
          setShowVeriff(false)
        }}
      >
        <VeriffLayer inUnderVerification={isUnderVerification} setUnderVerification={setUnderVerification}/>
      </Layer>
    }

    </Box>
  )
}
