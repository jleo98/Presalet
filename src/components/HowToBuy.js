import React,{useState} from 'react';

import {
  Box,
  Button,
  Layer,
  Text,
  Paragraph,
  Anchor,
  Image,
  ResponsiveContext,
  InfiniteScroll,
  Tab,
  Tabs
} from 'grommet';
import { Youtube } from "grommet-icons";

import styled from "styled-components";
import { useAppContext } from '../hooks/useAppState';


const StyledLayerHow = styled(Layer)`
  border: 1px solid var(--lines);
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 15px #00000054;
  border: 1px solid #E5E8EB;
  border-radius: 15px;
  opacity: 1;
`;



export default function HowToBuy() {

  const { state } = useAppContext();

  const [showHow, setShowHow] = useState();
  const size = React.useContext(ResponsiveContext);
  return (
    <>
    <Box align="center" direction="row-responsive" gap="medium" pad={{top: "large",horizontal: size}}>
      <Box align="left" alignSelf="center" width={"large"}>
        <Text color="white"
          style={{
            font: "normal normal 600 16px/24px Poppins",
          }}
        >
          Please Contact a Telegram Mod for any Questions | Or Email us at: Info@Lumishare.io
        </Text>
        <Text color="white"
          style={{
            font: "normal normal 600 16px/24px Poppins",
          }}
        >
          Please use only these 3 browsers for Safe Purchase of LUMI Tokens: Chrome, Mozilla or Brave.
        </Text>
        <Text color="white"
          style={{
            font: "normal normal 600 16px/24px Poppins",
          }}
        >
          Our Official Smart Contract address for LUMI Tokens on Binance Smart Chain (BSC) is:
          <Anchor
            href={`https://bscscan.com/address/${state.srg?.address}`}
            target="_blank"
            color="white"
            size="small"
          > {state.srg?.address}</Anchor>
        </Text>
        <Paragraph
          color="#FC5C5C"
          style={{
            font: "normal normal 600 16px/24px Poppins",
          }}
          textAlign="center"
        >
          Please be aware of scams
        </Paragraph>
      </Box>
      {
        /*
        <Anchor as={Text} color="#ffcc00" style={{
          font: "normal normal 600 16px/24px Poppins",
          letterSpacing: "0px",
          textTransform: "capitalize",
        }}
          onClick={() => {setShowHow(true)}}>
          How to Buy ?
        </Anchor>
        */
      }
      <Box alignSelf="center" align="center" >
        <Text
        as={Anchor}
        color="#060707"
        textAlign="center"
        style={{
          font: "normal normal 600 16px/24px Poppins",
        }}
        width="xsmall"
        target="_blank"
        href="https://youtu.be/p-kcaFAs26A">
          Check more details about LUMI token at youtube
        </Text>
        <Anchor
          target="_blank"
          a11yTitle="Youtube"
          href="https://youtu.be/p-kcaFAs26A"
          icon={<Youtube color="#ffcc00" size="large" />}
        />
      </Box>
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

      <Box pad="large"  width="large" height="large">
        <Box height={"small"}>
          <Text color="#060707" textAlign="center" size="large">
            YOUR GATE TO THE GOLDEN ERA IS NOW OPEN!
          </Text>
          <Text color="#060707" textAlign="center" size="large">
            A FEW SIMPLE STEPS TO BUY LUMI TOKEN WITH
          </Text>
        </Box>
        <Box overflow="auto" height={
          window.innerWidth <= 500 ?
          "medium":
          "xxlarge"
        }  gap="small" >
        <Tabs>

          <Tab title={
            <Box alignSelf="center" alignContent="center" align="center" gap="small"  direction={window.innerWidth <= 500 ? "row" : "column"}>

              <Box height="xxsmall" >
                <Image src={require('../assets/metamask.png')} fit="contain"/>
              </Box>
              <Text color="#E4761B" textAlign="center" size={size}>
                METAMASK
              </Text>
            </Box>

          }>

            <InfiniteScroll items={[
              {
                step: "STEP 1",
                text: "Tap the connect button to connect your wallet",
                image: require('../assets/step1.png')
              },
              {
                step: "STEP 2",
                text: "Choose or scan your crypto wallet. Make sure you are on the Binance Smart Chain network",
                image: require('../assets/step2.png')
              },
              {
                step: "STEP 3",
                text: "Tap Buy LUMI",
                image: require('../assets/step3.png')
              },
              {
                step: "STEP 4",
                text: "Choose your payment method and the amount",
                image: require('../assets/step4.png')
              },
              {
                step: "STEP 5",
                text: "Tap Buy",
                image: require('../assets/step5.png')
              },
              {
                step: "STEP 6",
                text: "Tap import tokens",
                image: require('../assets/step6_m.png')
              },
              {
                step: "STEP 7",
                text: "Put 0x5ae6862b92fe443d2c4addd9c6e65fc0c7ccddc0 in Token Address and tap IMPORT",
                image: require('../assets/step7_m.png')
              }
            ]}>
              {(item) => (
                <Box flex={false} background="#F9F9F9" direction="row-responsive" pad="medium">
                  <Box width="medium" pad="small" gap="small" >
                    <Text color="#ffcc00" textAlign="left">
                      {item.step}
                    </Text>
                    <Text color="#060707" textAlign="left" style={{
                      font: "normal normal normal 20px/60px Poppins",
                      lineHeight: "1.25"
                    }}>
                      {item.text}
                    </Text>
                  </Box>
                  <Box width="xsmall"></Box>
                  <Box width={"small"}  alignContent="center" alignSelf="center" >
                    <Image src={item.image} width={size} fit="contain"/>
                  </Box>
                </Box>
              )}
            </InfiniteScroll>
          </Tab>
          <Tab title={
            <Box alignSelf="center" alignContent="center" align="center" gap="small"  direction={window.innerWidth <= 500 ? "row" : "column"}>

              <Box height="xxsmall" >
                <Image src={require('../assets/trust_wallet.png')} fit="contain"/>
              </Box>
              <Text color="#3375BB" textAlign="center" size={size}>
                TRUST WALLET
              </Text>
            </Box>
          }>

            <InfiniteScroll items={[
              {
                step: "STEP 1",
                text: "Tap the connect button to connect your wallet",
                image: require('../assets/step1.png')
              },
              {
                step: "STEP 2",
                text: "Choose or scan your crypto wallet. Make sure you are on the Binance Smart Chain network",
                image: require('../assets/step2.png')
              },
              {
                step: "STEP 3",
                text: "Tap Buy LUMI",
                image: require('../assets/step3.png')
              },
              {
                step: "STEP 4",
                text: "Choose your payment method and the amount",
                image: require('../assets/step4.png')
              },
              {
                step: "STEP 5",
                text: "Tap Buy",
                image: require('../assets/step5.png')
              },
              {
                step: "STEP 6",
                text: "Tap on the banner",
                image: require('../assets/step6.png')
              },
              {
                step: "STEP 7",
                text: "Tap add custom token",
                image: require('../assets/step7.png')
              },
              {
                step: "STEP 8",
                text: "Select Binance Smart Chain",
                image: require('../assets/step8.png')
              },
              {
                step: "STEP 9",
                text: "Put 0x5ae6862b92fe443d2c4addd9c6e65fc0c7ccddc0 in Token Address and tap IMPORT",
                image: require('../assets/step9.png')
              }
            ]}>
              {(item) => (
                <Box flex={false} background="#F9F9F9" direction="row-responsive" pad="medium">
                  <Box width="medium" pad="small" gap="small" >
                    <Text color="#ffcc00" textAlign="left">
                      {item.step}
                    </Text>
                    <Text color="#060707" textAlign="left" style={{
                      font: "normal normal normal 20px/60px Poppins",
                      lineHeight: "1.25"
                    }}>
                      {item.text}
                    </Text>
                  </Box>
                  <Box width="xsmall"></Box>
                  <Box width={"small"}  alignContent="center" alignSelf="center" >
                    <Image src={item.image} width="100px" fit="contain"/>
                  </Box>
                </Box>
              )}
            </InfiniteScroll>
          </Tab>
        </Tabs>
        </Box>
        <Button label="close" primary size="xsmall" onClick={() => setShowHow(false)} />

      </Box>

      </StyledLayerHow>
    }
    </>
  )
}
