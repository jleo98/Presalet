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
      <Header background="none" pad="small">
        <Image
          src={require("./assets/logo.png")}
        />
        <TextInput
          placeholder="type here"
        />
        <User />
        <Connect />
        {
          !coinbase ?
          <Button label="Connect" onClick={loadWeb3Modal} /> :
          <Button icon={<Nodes />} secondary label="Swap" />
        }
      </Header>
      <Box direction="row" pad="medium">
        <Sidebar background="none" width="large"
          header={
            <Button primary label="Create" />
          }
          footer={
            <Button icon={<Help />} hoverIndicator />
          }
        >
          <Nav gap="small">
            <Button icon={<Projects />} label="Real State" hoverIndicator />
            <Button icon={<Clock />} label="Meta State" hoverIndicator />
            <Button icon={<Clock />} label="Meta State" hoverIndicator />

            <Button icon={<Clock />} label="Gold & Diamonds" hoverIndicator />

            <Button icon={<Clock />} label="G & D Mines" hoverIndicator />

            <Button icon={<Clock />} label="Smart Agriculture" hoverIndicator />


          </Nav>
        </Sidebar>
        <Box pad="medium" width="xxlarge" style={{
          background: `transparent url(${require('./assets/background.png')}) 0% 0% no-repeat padding-box`,
          backgroundSize: 'cover'
        }}>
          <Heading color="black" size="small">
            Discover, collect, and sell extraordinary NFTs
          </Heading>
          <Paragraph size="small">
            Explore on the world's best & largest NFT marketplace
          </Paragraph>
          <Button primary label="Create" />

        </Box>
        <Box pad="medium" >
          <Image
            src={require("./assets/background-header.png")}
          />
        </Box>
      </Box>
      <Footer background="brand" pad="medium">
        <Text>Copyright</Text>
        <Anchor label="About" />
      </Footer>
    </AppContext.Provider>
  )
}
