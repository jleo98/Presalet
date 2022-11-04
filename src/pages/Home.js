import { useState } from 'react';


import {
  Box,
  Button
} from 'grommet';

import {
  Link
} from 'react-router-dom';

import { useAppContext } from '../hooks/useAppState';

import About from '../components/About';
import Features from '../components/Features';


export default function PreSale() {

  const { state } = useAppContext();


  return (
    <Box>
      <About  />
      <Features />
      <Box align="center">
        <Button as={Link} to="/buy" primary color="#ffcc00" label="Buy" width="medium" />
      </Box>
    </Box>
  )
}
