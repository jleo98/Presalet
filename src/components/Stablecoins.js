import { useState,useEffect } from 'react';

import {
  Box,
  Select,
  Text
} from 'grommet';
import { ethers } from "ethers";

import abis from "../contracts/abis";

import { useAppContext } from '../hooks/useAppState';


export default function Stablecoins(props) {


  const { state } = useAppContext();

  const [value,setValue] = useState(state.stablecoins[0]?.name);
  const [busdBalance, setBalance] = useState();


  useEffect(() => {
    const items = state.stablecoins.filter(item => {
      return item.name === value
    });
    const newBusd = new ethers.Contract(items[0].id,abis.srg,props.provider);
    props.setBusd(newBusd);
  },[value])


  useEffect(() => {
    if(props.busd  && state.coinbase){
      props.busd.balanceOf(state.coinbase).then(newBalance => {
        setBalance(newBalance.toString());
        props.busd.on("Transfer", async (from,to,value) => {
          if(
            from.toLowerCase() === state.coinbase.toLowerCase() ||
            to.toLowerCase() === state.coinbase.toLowerCase()
          ){
            const newBalance = await props.busd.balanceOf(state.coinbase);
            setBalance(newBalance.toString());
          }
        });
      });
    }
  },[props]);

  return (

      <Box align="center" pad="medium">
      {
        state.stablecoins &&
        <>
        <Select
          options={state.stablecoins.map(item => item.name)}
          value={value}
          onChange={({ option }) => {
            setValue(option)
          }}
        />
        {
          busdBalance &&
          <Text>Balance: {busdBalance}</Text>
        }
        </>
      }
      </Box>

  )
}
