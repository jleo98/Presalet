import { useState, useEffect } from 'react';

import {
  Header,
  Heading,
  Button,
  Paragraph,
  Sidebar,
  Anchor,
  Footer,
  Text,
  Image,
  Grid,
  Nav,
  TextInput,
  Box,
  Tab,
  Tabs
} from 'grommet';
import { ethers } from "ethers";
import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';



import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useClient from './hooks/useGraphClient';


import ClientsLogo from './components/ClientsLogo';


export default function App() {

  const { state, actions } = useAppState();

  const {
    provider,
    coinbase,
    netId,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    user,
  } = useWeb3Modal();

  const {
    client,
    initiateClient,
  } = useClient();



  return (
    <AppContext.Provider value={{ state, actions }}>
      <Header background="none" pad="small" style={{
        boxShadow: "0px 3px 6px #0000001A",
      }}>
        <Image
          src={require("./assets/logo.png")}
        />
        <TextInput
          placeholder="type here"
        />
        {
          !coinbase ?
          <Button label="Connect" onClick={loadWeb3Modal}/> :
          <>
          <Image
            src={require("./assets/icons/user.png")}
          />
          <Image
            src={require("./assets/icons/wallet.png")}
          />
          <Button icon={<Nodes />} secondary label="Swap" />
          </>
        }
      </Header>
      <Box direction="row-responsive" pad="medium" >
        <Sidebar background="none" width="medium"
          header={
            <Box width="small" align="center">
            {
              !coinbase ?
              <Button primary color="#ffcc00" size="large" label="Connect" onClick={loadWeb3Modal} style={{
                font: "normal normal 600 14px/7px Poppins",
                borderRadius: "8px"
              }}/> :
              <Button primary color="#ffcc00" size="large" label="Create" style={{
                font: "normal normal 600 14px/7px Poppins",
                borderRadius: "8px"
              }}/>
            }

            </Box>
          }
          footer={
            <Button icon={<Help />} hoverIndicator />
          }
        >
          <Nav gap="small">
            <Button icon={
              <Image
                src={require("./assets/icons/real_estate.png")}
              />
            } label="Real State" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }} />
            <Button icon={
              <Image
                src={require("./assets/icons/real_estate.png")}
              />
            } label="Meta State" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }}/>
            <Button icon={
              <Image
                src={require("./assets/icons/meta_estate.png")}
              />
            } label="Meta State" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }}/>

            <Button icon={
              <Image
                src={require("./assets/icons/gold_diamonds.png")}
              />
            } label="Gold & Diamonds" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }}/>

            <Button icon={
              <Image
                src={require("./assets/icons/mines.png")}
              />
            } label="G & D Mines" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }}/>

            <Button icon={
              <Image
                src={require("./assets/icons/agriculture.png")}
              />
            } label="Smart Agriculture" hoverIndicator style={{
              border: "none",
              textAlign: "left",
              font: "normal normal 600 14px/7px Poppins"
            }}/>


          </Nav>
        </Sidebar>
        <Box direction="row-responsive" pad={{top: "xlarge",bottom:"xlarge"}} style={{
          background: `transparent url(${require('./assets/background.png')}) 0% 0% no-repeat padding-box`,
          backgroundSize: 'cover'
        }}>
          <Box pad="medium" width="xlarge">
            <Heading color="black" size="small" style={{
              font: "normal normal bold 50px/54px Poppins",
              letterSspacing: "0px",
              textTransform: "none"
            }}>
              Discover, collect, and sell extraordinary NFTs
            </Heading>
            <Paragraph size="small" style={{
              font: "normal normal 600 14px/7px Poppins"
            }}>
              Explore on the world's best & largest NFT marketplace
            </Paragraph>
            <Box width="small">
            {
              !coinbase ?
              <Button primary color="#ffcc00" size="large" label="Connect" onClick={loadWeb3Modal} style={{
                font: "normal normal 600 14px/7px Poppins",
                borderRadius: "8px"
              }}/> :
              <Button primary color="#ffcc00" size="large" label="Create" style={{
                font: "normal normal 600 14px/7px Poppins",
                borderRadius: "8px"
              }}/>
            }
            </Box>
          </Box>
          <Box pad="medium" >
            <Image
              src={require("./assets/background-header.png")}
            />
          </Box>
        </Box>

      </Box>
      <ClientsLogo />
      <Footer background="black" pad="medium">
        <Text style={{
          font: "normal normal normal 18px/27px Poppins"
        }}>
          © All Rights Reserved - IllumiShare SRG.
        </Text>
        <Anchor label="About" />
      </Footer>
    </AppContext.Provider>
  )
}
