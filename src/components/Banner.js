import React from 'react';

import {
  Box,
  Text,
  ResponsiveContext
} from 'grommet';
import styled from "styled-components";

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
        <StyledText direction="horizontal" color="#FFCC00">
          Pre-Sale Is
        </StyledText>
        <StyledText color="#FFCC00">
          Closed
        </StyledText>
        <Box background="black" direction="row" alignSelf="center" alignContent="center" pad="medium"  gap="medium">
          <Box gap="xsmall" align="center">
            <Text weight="bold" color="white" size={"small"}>Pre Sale Price</Text>
            <Text weight="bold" color="#FFCC00" size={size}>US$ 0.12</Text>
            <Text weight="bold" color="white" size={"small"}>Per SRG token</Text>
          </Box>
          <Box gap="xsmall" align="center">
          <Text weight="bold" color="white" size={"small"}>CEX, DEX Listing Price <small>(1Q 2023)</small></Text>
            <Text weight="bold" color="#FFCC00">US$ 0.18</Text>
            <Text weight="bold" color="white" size={"small"}>Per SRG token</Text>
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
