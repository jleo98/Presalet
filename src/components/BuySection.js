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
  Spinner,
  Notification
} from 'grommet';

import Countdown from "react-countdown";

import crypto from 'crypto-browserify'

import styled from "styled-components";
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';
import  useOrbis  from '../hooks/useOrbis';
import { fromString } from 'uint8arrays'

import GoldListModal from './GoldListModal';
import Stablecoins from './Stablecoins';
import VeriffLayer from './VeriffLayer';


const StyledText = styled(Text)`
  font-weight: 600;
  line-height: 1.6;
  font: normal normal bold Poppins;

`;

const apiPrivateKey = process.env.REACT_APP_VERIFF_PRIV_KEY;

export default function BuySection(props) {

  const { state } = useAppContext();
  const { orbisClient,connectSeed,addWallet,isUnderVerification } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Native");
  const [show,setShow] = useState();
  const [showVeriff,setShowVeriff] = useState();
  const [underVerification,setUnderVerification] = useState()
  const [veriffReason,setVeriffReason] = useState()
  const [showNotification,setShowNotification] = useState()
  const [notificationShowed,setShowedNotification] = useState()

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

  const checkVeriffStatus = async() => {

    const payloadAsString = underVerification;

    const signature = crypto
      .createHmac('sha256', apiPrivateKey)
      .update(Buffer.from(payloadAsString, 'utf8'))
      .digest('hex')
      .toLowerCase();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-HMAC-SIGNATURE': signature,
            "X-AUTH-CLIENT":  process.env.REACT_APP_VERIFF_API
        }
    };

    const result = await fetch(`https://stationapi.veriff.com/v1/sessions/${underVerification}/decision`, requestOptions)
    const obj = JSON.parse(await result.text());
    if(obj.verification?.status !== "approved" && obj.verification){
      setVeriffReason(obj.verification?.reason ? obj.verification.reason : "Documents not sent");
      setShowNotification(true)
      setUnderVerification();
    }
    return
  }


  useEffect(() => {
    const seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED, 'base16'))
    connectSeed(seed);
  },[])


  useEffect(() => {
    if(underVerification && !state.whitelisted && orbisClient){
      //checkVeriffStatus();
      setInterval(() => {
        if(underVerification && !state.whitelisted && !notificationShowed){
          checkVeriffStatus();
        }
      },5000)
    }
  },[
    notificationShowed,
    underVerification,
    state.whitelisted,
    orbisClient
  ])

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
            {
              veriffReason && showNotification &&
              <Notification
                toast
                status="warning"
                title="Error in Veriff Verification"
                message={veriffReason}
                onClose={() => {
                  setShowNotification(false)
                  setShowedNotification(true)
                }}
              />

            }
            <Button primary color="#ffcc00" size="large" className="btn-primary" onClick={() => {
              setVeriffReason();
              setShowNotification(false);
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
            <Text size="xsmall" color="white">It can take up to 10 minutes</Text>

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
          setShowVeriff(false)
        }}
        onClickOutside={() => {
          setShowVeriff(false)
        }}
      >
        <VeriffLayer
          setShowedNotification={setShowedNotification}
          isUnderVerification={isUnderVerification}
          setUnderVerification={setUnderVerification}
          addWallet={addWallet}
          setShowVeriff={setShowVeriff}
        />
      </Layer>
    }

    </Box>
  )
}
