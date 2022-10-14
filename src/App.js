import { useState, useEffect,useMemo } from 'react';

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
  Tabs,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Menu,
  Layer
} from 'grommet';
import { ethers } from "ethers";
import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';
import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'


import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';


import ClientsLogo from './components/ClientsLogo';
import Tokenize from './components/Tokenize';

import ERC721Abi from './contracts/abis/ERC721Abi';

export default function App() {

  const { state, actions } = useAppState();

  const [collections,setCollections] = useState();

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
    getTopCollections
  } = useGraphClient();
  const [show, setShow] = useState();


  useEffect(() => {
    initiateClient(1);
  },[]);

  useMemo(async () => {
    if(client){
      const results = await getTopCollections();
      const newCollections = results.data.trades.map(async item => {
        let res = item;
        try{
          const erc721 = new ethers.Contract(item.collection.id,ERC721Abi,provider);
          console.log(item.tokenId)
          const uri = await erc721.tokenURI(item.tokenId);
          console.log(uri)
          const metadata = JSON.parse(await (await fetch(uri.replace("ipfs://","https://ipfs.io/ipfs/"))).text());
          console.log(metadata)
          res = {
            ...item,
            metadata: metadata
          }
        } catch(err){
          console.log(err)
        }
        return(res)
      })
      setCollections(await Promise.all(newCollections));
    }
  },[client])

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
          <Menu
            label=  <Image
                      src={require("./assets/icons/user.png")}
                     />
            items={[
              { label: 'First Action', onClick: () => {} },
              { label: 'Second Action', onClick: () => {} },
            ]}
          />

          <Image
            src={require("./assets/icons/wallet.png")}
          />
          <Button icon={<Nodes />} secondary label="Swap" onClick={() => {
              setShow(!show)
          }}/>
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
        >
          <Nav gap="small" style={{
            alignItems: "flex-start"
          }}>
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
        {
          show &&
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
          {
            provider && coinbase &&
            <SwapWidget provider={provider} />

          }
          </Layer>
        }

      </Box>
      <Box align="center">
        <Heading style={{
          color:"black",
          font: "normal normal bold 50px/54px Poppins",
          letterSspacing: "0px",
          textTransform: "none",
          textAlign:"center"
        }}>
          Top Collections over last 24 hours
        </Heading>
        <Text>****Under construction, getting data from OpenSea just as DEMO</Text>
        <Anchor href="https://thegraph.com/hosted-service/subgraph/messari/opensea-v2-ethereum" target="_blank">Click to see graph used</Anchor>
      </Box>
      <Box direction="row-responsive" pad="medium" align="center" wrap={true}>
      {
        collections?.map((item) => {
          return(
            <Box pad="small">
              <Card  height="141px" width="400px" background="light-1">
                <CardBody>
                  <Box direction="row-responsive" align="center" wrap={true}>
                    <Box height="small" width="120px" height="120px">
                      <Image src={item.metadata?.image?.replace("ipfs://","https://ipfs.io/ipfs/")} fit="cover" />
                    </Box>
                    <Box align="center">
                      <Box pad="xsmall">
                        <Text><b>{item.collection.name}</b></Text>
                      </Box>
                      <Box>
                        <Text>{item.collection.metadata?.description}</Text>
                      </Box>
                      <Box>
                        <Text size="xsmall"><b>{item.tokenId}</b></Text>
                      </Box>
                      <Box direction="row-responsive" pad="medium" align="left" wrap={true}>
                        <Box margin="xsmall">
                          <Text size="xsmall">Floor price: {item.priceETH} ETH</Text>
                        </Box>
                        <Box margin="xsmall">
                        {
                          item.collection.totalSupply &&
                          <Text size="xsmall">Supply: {item.collection.totalSupply}</Text>
                        }
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          )
        })
      }
      </Box>
      {
        !collections &&
        <Box align="center" pad="large">
          <Spinner />
          <Text>Loading ...</Text>
        </Box>
      }
      <Box align="center">
      {
        collections &&
        <Button primary color="#ffcc00" size="large" label="All Collections" style={{
          font: "normal normal 600 14px/7px Poppins",
          borderRadius: "8px"
        }}/>
      }
      </Box>
      <Tokenize/>
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
