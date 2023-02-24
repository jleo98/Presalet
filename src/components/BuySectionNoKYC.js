import React,{ useState,useEffect } from 'react';

import {
  Box,
  Button,
  Layer,
  Text,
  ResponsiveContext,
} from 'grommet';

import {
  useParams
} from 'react-router-dom';


import styled from "styled-components";
import { ethers } from "ethers";
import ReactGA from "react-ga4";

import { useAppContext } from '../hooks/useAppState';
//import useOrbis from '../hooks/useOrbis';

import GoldListModal from './GoldListModal';
import StakeModal from './StakeModal';

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
  //const { connectSeed, addWallet, isUnderVerification } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Stablecoin");
  const [show, setShow] = useState();
  const [migratingV2, setMigratingV2] = useState();

  const [showStake, setShowStake] = useState();
  const [stakeActive, setStakingActive] = useState();

  const { uri } = useParams();
  const size = React.useContext(ResponsiveContext);

  const buyTokens = async (total) => {
    const signer = state.provider.getSigner();
    const goldListWithSigner = state.goldList.connect(signer);
    const amount = ethers.utils.parseEther(total).toString();
    const refAddr = localStorage.getItem("refAddr") ? localStorage.getItem("refAddr") : ethers.constants.AddressZero;
    let tx;
    if (value === "Native") {
      tx = await goldListWithSigner.claimTokensWithNative(refAddr,false,{
        value: amount
      });
    } else {
      const allowance = await busd.allowance(state.coinbase, state.goldList.address);
      if (Number(amount) > allowance) {
        const busdWithSigner = busd.connect(signer);
        const txApproval = await busdWithSigner.approve(state.goldList.address, amount);
        await txApproval.wait();
      }
      tx = await goldListWithSigner.claimTokensWithStable(busd.address, amount,refAddr,true);
    }

    await tx.wait();

    if(refAddr !== ethers.constants.AddressZero){
      ReactGA.event({
        category: 'user_referral',
        action: 'referral_earn',
        data: {
          referralId: refAddr,
          amount: amount
        }
      });
    }

  }


  const getExpectedSrg = async (total) => {
    const amount = await state.goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  const claimV2 = async () => {
    let tx;
    const signer = state.provider.getSigner();
    const allowance = await state.srgV1.allowance(state.coinbase, state.srg.address);
    const balance = await state.srgV1.balanceOf(state.coinbase);
    if(balance > allowance){
      const srgV1WithSigner = state.srgV1.connect(signer);
      tx = await srgV1WithSigner.approve(state.srg.address, balance);
      await tx.wait();
    }

    const srgWithSigner = state.srg.connect(signer);
    tx = await srgWithSigner.claimAirdrop();
    await tx.wait();

  }

  useEffect(()=>{
    ReactGA.initialize('G-DW0T7403L8',{
      debug: true,
      titleCase: false,
      siteSpeedSampleRate: 100
    });
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: window.location.href });
  },[])

  useEffect(() => {
    let ref = localStorage.getItem("refAddr");
    if(!ref && uri && state.coinbase){
      try{
        const refAddr = ethers.utils.getAddress(uri);
        if(refAddr.toLowerCase() === state.coinbase.toLowerCase()) return;
        localStorage.setItem("refAddr",refAddr);
        ref = refAddr

      } catch(err){

      }
    }
    if(ref){
      ReactGA.event({
        category: 'user_referral',
        action: 'referral_page_view',
        label: ref
      });
    }
  },[uri,state.coinbase])

  useEffect(() => {
    if(state.srg){
      state.srg.stakingActive(active => {
        setStakingActive(active);
      })
    }
  },[state.srg])

  return (
    <Box margin={{ horizontal: "7%" }} >
      <Box>
      {
        !state.coinbase &&
        <Button primary style={{ borderRadius: "8px" }} color="#ffcc00" size={size} label="Connect" onClick={state.loadWeb3Modal} />

      }
      </Box>
      <Box>
      {
        state.coinbase &&
        <>
        {
          show &&
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
          </StyledLayerBuy>
        }
        {
          showStake &&
          <StyledLayerBuy
            onEsc={() => {
              setShowStake(false);
            }}
            onClickOutside={() => {
              setShowStake(false);
            }}
          >
            <StakeModal />
          </StyledLayerBuy>
        }
        {
          state.goldList &&
          state.stablecoins &&
          Number(state.goldListBalance) > 0 &&
          <Box pad={{ bottom: "xlarge" }} direction="responsive-row" alignSelf="center" gap="medium">
            <Button
              primary
              size={size}
              color="#ffcc00"
              className="btn-primary"
              style={{ borderRadius: "8px" }}
              onClick={() => setShow(true)}
              label="Buy SRG"
            />
            {
              state.srgV1Balance > 0 &&
              <Button
                primary
                size={size}
                color="#ffcc00"
                className="btn-primary"
                style={{ borderRadius: "8px" }}
                onClick={async () => {
                    try{
                      setMigratingV2(true);
                      await claimV2()
                      setMigratingV2(false);
                    } catch(err){
                      console.log(err)
                      setMigratingV2(false);
                    }
                  }
                }
                label={migratingV2 ? "Migrating" : "Migrate V2"}
                disabled={migratingV2}
              />
            }
            {
              state.coinbaseBalance> 0 && stakeActive &&
              <Button
                primary
                size={size}
                color="#ffcc00"
                className="btn-primary"
                style={{ borderRadius: "8px" }}
                onClick={() => setShowStake(true)}
                label="Stake SRG"
              />
            }
          </Box>

        }
        </>
      }
      </Box>

    </Box>
  )
}
