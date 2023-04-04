import React from 'react';

import About from '../components/About';
import Banner from '../components/Banner';
import BuySection from '../components/BuySectionNoKYC';

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
      <Box pad={{top:"medium"}} alignContent="center"  width="large" >
        <BuySection/>
      </Box>
      <HowToBuy />
    </Box>
    </>
  )
}
