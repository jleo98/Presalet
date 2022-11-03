import { useState,useEffect } from 'react';

import {
  Box,
  Select
} from 'grommet';
import { ethers } from "ethers";

import abis from "../contracts/abis";

import { useAppContext } from '../hooks/useAppState';


export default function Stablecoins(props) {


  const { state } = useAppContext();

  const [value,setValue] = useState(state.stablecoins[0]?.name);


  useEffect(() => {
    const items = state.stablecoins.filter(item => {
      return item.name === value
    });
    const newBusd = new ethers.Contract(items[0].id,abis.srg,props.provider);
    props.setBusd(newBusd);
  },[value])

  return (

      <Box align="center" pad="medium">
      {
        state.stablecoins &&
        <Select
          options={state.stablecoins.map(item => item.name)}
          value={value}
          onChange={({ option }) => {
            setValue(option)
          }}
        />
      }
      </Box>

  )
}
