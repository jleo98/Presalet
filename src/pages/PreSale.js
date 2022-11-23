import React,{ useState } from 'react';

import About from '../components/About';
import BuySection from '../components/BuySection';
import Banner from '../components/Banner';
import {
  Box,
  Button,
  Layer,
  Text,
  Spinner,
  Anchor,
  Image,
  Accordion,
  AccordionPanel,
  ResponsiveContext
} from 'grommet';
import { Youtube } from "grommet-icons";

import styled from "styled-components";

const StyledLayerHow = styled(Layer)`
  border: 1px solid var(--lines);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 15px #00000054;
  border: 1px solid #E5E8EB;
  border-radius: 15px;
  opacity: 1;
`;

export default function PreSale() {
  const [showHow, setShowHow] = useState();
  const size = React.useContext(ResponsiveContext);

  return (
    <>
    <About  />
    <Banner />
    <Box align="center" pad={{top: "medium"}}>
      <Anchor as={Text} color="#ffcc00" style={{
        font: "normal normal 600 16px/24px Poppins",
        letterSpacing: "0px",
        textTransform: "capitalize",
      }}
        onClick={() => {setShowHow(true)}}>
        How to Buy ?
      </Anchor>
    </Box>
    {
      showHow &&
      <StyledLayerHow
        onEsc={() => {
          setShowHow(false);
        }}
        onClickOutside={() => {
          setShowHow(false);
        }}
      >
      <Box pad="large"  width="large" height="xlarge">
        <Box height={size}>
          <Text color="#060707" textAlign="center" size="large">
            YOUR GATE TO THE GOLDEN ERA IS NOW OPEN!
          </Text>
          <Text color="#060707" textAlign="center" size="large">
            A FEW SIMPLE STEPS TO BUY SRG TOKEN WITH
          </Text>
        </Box>
        <Box height={size} direction="row-responsive" gap="large" align="center" alignSelf="center" alignContent="center">

          <Box alignSelf="center" alignContent="center" align="center" gap="small" direction={window.innerWidth <= 500 ? "row" : "column"}>
            <Box height="xxsmall" >
              <Image src={require('../assets/MetaMask_Fox.svg.png')} fit="contain"/>
            </Box>
            <Text color="#E4761B" textAlign="center" size={size}>
              METAMASK
            </Text>
          </Box>
          <Box alignSelf="center" alignContent="center" align="center" gap="small"  direction={window.innerWidth <= 500 ? "row" : "column"}>

            <Box height="xxsmall" >
              <Image src={require('../assets/trust_wallet.png')} fit="contain"/>
            </Box>
            <Text color="#3375BB" textAlign="center" size={size}>
              TRUST WALLET
            </Text>
          </Box>

        </Box>
        <Box height={"large"} gap="small">

          <Box  background="#F9F9F9" direction="row-responsive" gap="medium">
            <Box pad="small" gap="small" >
              <Text color="#ffcc00" textAlign="left">
                STEP 1
              </Text>
              <Text color="#060707" textAlign="left" style={{
                font: "normal normal normal 20px/60px Poppins",
                lineHeight: "1.25"
              }}>
                Tap the connect button to connect your wallet
              </Text>
            </Box>
            <Box width="xsmall"></Box>
            <Box width={size}  alignContent="center" alignSelf="center" >
              <Image src={require('../assets/step1.png')}  fit="contain"/>
            </Box>
          </Box>
          <Box  background="#F9F9F9" direction="row-responsive" gap="medium">
            <Box pad="small" gap="small"  >
              <Text color="#ffcc00" textAlign="left">
                STEP 2
              </Text>
              <Text color="#060707" textAlign="left" style={{
                font: "normal normal normal 20px/60px Poppins",
                lineHeight: "1.25"
              }}>
                Choose or scan your crypto wallet. Make sure you are on the Binance Smart Chain network
              </Text>
            </Box>
            <Box width={size} alignContent="center" alignSelf="center">
              <Image src={require('../assets/step2.png')} fit="contain"/>
            </Box>
          </Box>

        </Box>
        <Button label="close" primary size="xsmall" onClick={() => setShowHow(false)} />

      </Box>

      </StyledLayerHow>
    }
    </>
  )
}
