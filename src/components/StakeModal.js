import { useState,useEffect } from 'react';

import {
  Box,
  Text,
  Button
} from 'grommet';
import { ethers } from "ethers";

import { useAppContext } from '../hooks/useAppState';



export default function StakeModal(props) {

  const { state } = useAppContext();


  const [total, setTotal] = useState();
  const [totalHours, setTotalHours] = useState();

  const [msg,setMsg] = useState();
  const [tx,setTx] = useState();

  const stakeTokens = async (total) => {
    const signer = state.provider.getSigner();
    const srgWithSigner = state.srg.connect(signer);
    const amount = ethers.utils.parseEther(total).toString();

    const allowance = await state.srg.allowance(state.coinbase, state.srg.address);
    if (Number(amount) > allowance) {
      const txApproval = await srgWithSigner.approve(state.srg.address, amount);
      await txApproval.wait();
    }
    const tx = await srgWithSigner.stake(state.srg.address, amount);

    await tx.wait();

  }


  return (

      <Box align="center" pad="medium" width="large">
      {
        state.provider && state.coinbase &&
        <>
        <Text style={{color: "black",font:"normal normal 600 20px/40px Poppins"}}>
          Amount of SRG
        </Text>
        <Box pad="small" width="large" >
          <input
            placeholder="Amount"
            onChange={(e) => {

              if(e.target.value < 0 || (e.target.value > 0 && e.target.value <= 0.0001)){
                e.target.value = 0.0001
              }
              setTotal(e.target.value)
            }}
            type="number"
            step="0.0001"
            min={0.0001}
            value={total}
            style={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              border: "3px solid #E6E6E6",
              borderRadius: "8px",
              opacity: 1,
              height: "46px",
              font: "normal normal normal 16px/40px Poppins",
            }}
         />
        </Box>
        <Text style={{color: "black",font:"normal normal 600 20px/40px Poppins"}}>
          Hours of Staking
        </Text>
        <Box pad="small" width="large" >
          <input
            placeholder="Hours"
            onChange={(e) => {

              if(e.target.value <= 1){
                e.target.value = 1
              }
              setTotalHours(e.target.value)
            }}
            type="number"
            step="1"
            min={1}
            value={totalHours}
            style={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              border: "3px solid #E6E6E6",
              borderRadius: "8px",
              opacity: 1,
              height: "46px",
              font: "normal normal normal 16px/40px Poppins",
            }}
         />
        </Box>
        <Box width="large">
          <Button style={{height: "43px",borderRadius: "8px"}} primary color="#ffcc00" className="btn-primary" onClick={async () => {
            try{
              setTx(true);
              setMsg("Confirm transactions (token approval and stake)")
              await stakeTokens(total);
              setTx(false);
              setMsg("")
            } catch(err){
              setMsg(err.reason);
              setTx(false)
            }
            setTimeout(() => {
              setMsg()
            },3000)
          }} label={!msg && !tx ? "Stake" : "Confirm and Wait"}
          disabled={(total === 0 || tx || msg)} />
        </Box>
        <Box>
        {
          msg &&
          <Text size="xsmall">{msg}</Text>
        }
        </Box>
        </>

      }
      </Box>

  )
}
