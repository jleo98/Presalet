import React from 'react';

import About from '../components/About';
import Banner from '../components/Banner';
import HowToBuy from '../components/HowToBuy';

import {
  Box,
} from 'grommet';



export default function PreSale() {
  return (
    <>
    <About />
    <Box flex={false} align="center">
      <Banner />
      <HowToBuy />
    </Box>
    </>
  )
}
