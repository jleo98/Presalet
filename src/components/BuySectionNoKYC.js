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

import { useAppContext } from '../hooks/useAppState';
//import useOrbis from '../hooks/useOrbis';

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
  //const { connectSeed, addWallet, isUnderVerification } = useOrbis();

  const [busd, setBusd] = useState();
  const [value, setValue] = useState("Stablecoin");
  const [show, setShow] = useState();
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

  }


  const getExpectedSrg = async (total) => {
    const amount = await state.goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  useEffect(() => {
    const ref = localStorage.getItem("refAddr");
    console.log(uri)
    console.log(ref)
    if(!ref && uri){
      try{
        const refAddr = ethers.utils.getAddress(uri);
        localStorage.setItem("refAddr",refAddr);
      } catch(err){

      }
    }
  },[uri])


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
          state.goldList &&
          state.stablecoins &&
          Number(state.goldListBalance) > 0 &&
          <Box pad={{ bottom: "xlarge" }}>
            <Button primary size={size} color="#ffcc00" className="btn-primary" style={{ borderRadius: "8px" }} onClick={() => setShow(true)} label="Buy SRG" />
          </Box>

        }
        </>
      }
      </Box>

    </Box>
  )
}
