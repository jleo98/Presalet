import React from 'react';

import {
  Box,
  Text,
  Anchor,
  Image,
  ResponsiveContext
} from 'grommet';
import styled from "styled-components";

import { useAppContext } from '../hooks/useAppState';
import BuySectionNoKYC from './BuySectionNoKYC';

const StyledGetStartedText = styled(Text)`
  color: var(--unnamed-color-ffcc00);
  font: normal normal 600 16px/24px Poppins;
  letter-spacing: 0px;
  color: #FFCC00;
  text-transform: Uppercase;
  opacity: 1;
`;




const StyledText = styled(Text)`
  font: normal normal 600 30px/61px Poppins;
  letter-spacing: 0px;
  text-transform: capitalize;
  opacity: 1;
`;


export default function Banner() {
  const size = React.useContext(ResponsiveContext);
  return (
    <>
    <Box align="center" flex={false} gap={size} pad={{ horizontal: "large", top: "small" }} >

      <Box alignContent={size === "small" ? "center" : "left"} pad={{ top: "xsmall" }} width="large" >
        <StyledGetStartedText direction="horizontal" color="#FFCC00">
          Get Started
        </StyledGetStartedText>
        <StyledText color="#F1F1F1">
          Buy SRG
        </StyledText>
        <Box background="#F1F1F121" pad="medium" align="justify" gap="medium">
          <Box gap="xsmall" align="center">
            <Text weight="bold" color="white" size={size}>Pre Sale Price (Live Now, 4Q 2022):</Text>
            <Text weight="bold" color="white" size={size}>US$ 0.12 per SRG token</Text>
          </Box>
          <Box gap="xsmall" align="center">
            <Text weight="bold" color="white" size={size}>CEX, DEX Listing Price (1Q 2023): </Text>
            <Text weight="bold" color="white" size={size}>US$ 0.18 per SRG token (Starting price)</Text>
          </Box>
        </Box>
      </Box>
    </Box>
    <Box pad={{top:"medium"}} alignContent="center"  width="large" >
      <BuySectionNoKYC/>
    </Box>
    </>
  )
}
