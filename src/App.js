import { useState, useEffect,useMemo } from 'react';

import {
  Box,
} from 'grommet';
import { ethers } from "ethers";
//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';



import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';


import ClientsLogo from './components/ClientsLogo';
import Tokenize from './components/Tokenize';
import SwapModal from './components/SwapModal';
import GoldListModal from './components/GoldListModal';
import MainMenu from './components/MainMenu';
import SideMenu from './components/SideMenu';
import TopCollections from './components/TopCollections';
import Banner from './components/Banner';
import DappFooter from './components/DappFooter';

import abis from "./contracts/abis";
import addresses from "./contracts/addresses";

export default function App() {

  const { state, actions } = useAppState();

  const [collections,setCollections] = useState();
  const [srg,setSrg] = useState();
  const [goldList,setGoldList] = useState();
  const [busd,setBusd] = useState();


  const [showSwap,setShowSwap] = useState();
  const [showGoldList,setShowGoldList] = useState();


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



  useEffect(() => {
    initiateClient(1);
  },[]);
  useEffect(() => {
    // Goerli
    if(netId === 5){
      const newSrg = new ethers.Contract(addresses.srg.goerli,abis.srg,provider);
      const newGoldList = new ethers.Contract(addresses.goldList.goerli,abis.goldListBSC,provider);
      setSrg(newSrg);
      setGoldList(newGoldList);
    }
    // Mumbai
    if(netId === 80001){
      const newSrg = new ethers.Contract(addresses.srg.mumbai,abis.srg,provider);
      const newGoldList = new ethers.Contract(addresses.goldList.mumbai,abis.goldListMatic,provider);
      setSrg(newSrg);
      setGoldList(newGoldList);
    }
    if(netId === 97){
      const newSrg = new ethers.Contract(addresses.srg.bsctestnet,abis.srg,provider);
      const newGoldList = new ethers.Contract(addresses.goldList.bsctestnet,abis.goldListBSC,provider);
      const newBusd = new ethers.Contract(addresses.busd.bsctestnet,abis.srg,provider);

      setSrg(newSrg);
      setGoldList(newGoldList);
      setBusd(newBusd);
    }
  },[netId]);
  useMemo(async () => {
    if(client){
      const results = await getTopCollections();
      const newCollections = results.data.trades.map(async item => {
        let res = item;
        try{
          // DEMO PURPOSE
          const demoProvider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/"+process.env.REACT_APP_INFURA)
          const erc721 = new ethers.Contract(item.collection.id,abis.erc721,demoProvider);
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


  const buyTokens = async (total) => {
    const signer = provider.getSigner();
    const goldListWithSigner = goldList.connect(signer);
    const amount = ethers.utils.parseEther(total).toString()
    let tx;
    if(netId === 5 || netId === 80001){
      tx = await goldListWithSigner.claimTokens({
        value: amount
      });
    } else if(netId === 97){
      const allowance = await busd.allowance(coinbase,goldList.address);
      if(amount > allowance){
        const busdWithSigner = busd.connect(signer);
        const txApproval = await busdWithSigner.approve(goldList.address,amount);
        await txApproval.wait();
      }
      const goldListWithSigner = goldList.connect(signer);
      tx = await goldListWithSigner.claimTokensWithERC20(busd.address,amount);
    }

    await tx.wait();

  }
  const getExpectedSrg = async (total) => {
    const amount = await goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return(amount.toString()/10**18);
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
      <MainMenu
        coinbase={coinbase}
        loadWeb3Modal={loadWeb3Modal}
        showSwap={showSwap}
        showGoldList={showGoldList}
        setShowSwap={setShowSwap}
        setShowGoldList={setShowGoldList}
      />
      <Box direction="row-responsive" pad="medium" >
        <SideMenu
          coinbase={coinbase}
          loadWeb3Modal={loadWeb3Modal}
        />
        <Banner
          coinbase={coinbase}
          loadWeb3Modal={loadWeb3Modal}
        />
        {
          showSwap &&
          <SwapModal provider={provider} coinbase={coinbase} setShow={setShowSwap}/>
        }
        {
          showGoldList &&
          <GoldListModal
            provider={provider}
            coinbase={coinbase}
            netId={netId}
            buyTokens={buyTokens}
            setShow={setShowGoldList}
            getExpectedSrg={getExpectedSrg}
          />
        }
      </Box>
      <TopCollections
        collections={collections}
      />
      <Tokenize/>
      <ClientsLogo />
      <DappFooter />
    </AppContext.Provider>
  )
}
