import { useState,useEffect } from 'react';

import {
  Box,
  Text,
  Button
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';



export default function GoldListModal(props) {

  const { state } = useAppContext();


  const [total, setTotal] = useState();

  const [srgExpect,setSrgExpect] = useState();
  const [msg,setMsg] = useState();

  useEffect(() => {
    if(total > 0 && props.value==="Native"){
      try{
        props.getExpectedSrg(total).then(amount => {
          console.log(amount)
          setSrgExpect(amount)
        })
      }catch(err){
        console.log(err)
      }
    }
    if(total > 0  &&  props.value==="Stablecoin"){
      setSrgExpect(Number(total)/0.12);
    }
  },[total,props]);



  return (

      <Box align="center" pad="medium" width="large">
      {
        state.provider && state.coinbase &&
        <>
        <Text style={{color: "black",font:"normal normal 600 20px/40px Poppins"}}>
          Amount of {' '}
          {
            props.value === "Native" ?
              state.netId === 5 ?
              "Goerli ETH" :
              state.netId === 97 ?
              "BNB" :
              "Matic" :
            "USD"
          }
        </Text>
        <Box pad="small" width="large">
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
        <Box  height="xsmall">
        {
          srgExpect && total &&
          <Text size="small" style={{
           textAlign: "center",
           font: "normal normal normal 16px/40px Poppins",
           letterSpacing: "0px",
           color: "#8F979E",
           opacity: 1
          }}>{srgExpect} SRG</Text>
        }
        </Box>
        <Box width="large">
        {
          total > 0 ?
            <Button style={{height: "43px",borderRadius: "8px"}} primary color="#ffcc00" className="btn-primary" onClick={async () => {
              try{
                await props.buyTokens(total);
              } catch(err){
                console.log(err)
                setMsg(err.reason)
              }
              setTimeout(() => {
                setMsg()
              },3000)
            }} label="Buy" /> :
            <Button style={{height: "43px",borderRadius: "8px"}} primary color="#ffcc00" className="btn-primary" disabled label="Buy" />
        }
        </Box>

        {
          msg &&
          <Text size="small">{msg}</Text>
        }
        </>

      }
      </Box>

  )
}
