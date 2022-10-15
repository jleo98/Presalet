import { useState,useEffect } from 'react';

import {
  Box,
  Layer,
  Image,
  Text,
  TextInput,
  Button
} from 'grommet';
import { ethers } from "ethers";


export default function GoldListModal(props) {


  const [total, setTotal] = useState();
  const [lastTotal,setLastTotal] = useState();

  const [srgExpect,setSrgExpect] = useState();
  const [msg,setMsg] = useState();

  useEffect(() => {
    if(total > 0 && total !== lastTotal){
      try{
        props.getExpectedSrg(total).then(amount => {
          console.log(amount)
          setSrgExpect(amount)
          setLastTotal(total)
        })
      }catch(err){
        console.log(err)
      }
    }
  },[total,props]);

  return (
    <Layer
      onEsc={() => props.setShow(false)}
      onClickOutside={() => props.setShow(false)}
    >
      <Box align="center" pad="medium">
      {
        props.provider && props.coinbase && props.netId === 5 &&
        <>
        <Image
          src={require("../assets/logo.png")}
          size="small"
        />
        <Text>Amount of {props.netId === 5 ? "Goerli ETH" : "Matic"}</Text>
        <TextInput onChange={(e) => {setTotal(e.target.value)}} />
        {
          srgExpect && total &&
          <Text size="small">{srgExpect} SRG</Text>
        }
        {
          total > 0 &&
          <Button primary onClick={async () => {
            try{
              await props.buyTokens(total);
            } catch(err){
              console.log(err)
              setMsg(err.message.split("reverted: ")[1].split('",')[0])
            }
            setTimeout(() => {
              setMsg()
            },3000)
          }} label="Buy" />
        }
        {
          msg &&
          <Text size="small">{msg}</Text>
        }
        </>

      }
      </Box>

    </Layer>
  )
}
