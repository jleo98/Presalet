import { useState, useEffect, useMemo } from 'react';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import {
  Box,
  RadioButtonGroup,
  Layer,
  Text,
  Anchor
} from 'grommet';
import { ethers } from "ethers";
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';

//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';


import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';

import Buy from './pages/PreSale';
import MainMenu from './components/MainMenu';
import Staking from './components/Staking';
import DappFooter from './components/DappFooter';

import abis from "./contracts/abis";
import addresses from "./contracts/addresses";

export default function App() {

  const { state, actions } = useAppState();

  const [srg, setSrg] = useState();
  const [goldList, setGoldList] = useState();
  const [busd, setBusd] = useState();
  const [stablecoins, setStablecoins] = useState();
  const [value, setValue] = useState("Native");


  const [showSwap, setShowSwap] = useState();
  const [showStake, setShowStake] = useState();
  const [coldStaking, setColdStaking] = useState();


  const {
    provider,
    coinbase,
    netId,
    loadWeb3Modal,
    logoutOfWeb3Modal,
  } = useWeb3Modal();

  const {
    client,
    initiateClient,
    getStablecoins
  } = useGraphClient();

  useEffect(() => {
    actions.setProvider(provider)
  },[provider])
  useEffect(() => {
    actions.setCoinbase(coinbase)
  },[coinbase]);
  useEffect(async () => {
    if(coinbase && goldList){
      const newWhitelisted = await goldList.goldList(coinbase);
      actions.setWhitelisted(newWhitelisted);
    }
  },[coinbase,goldList]);
  useEffect(() => {
    actions.setNetId(netId)
  },[netId])
  useEffect(() => {
    actions.setSrg(srg)
  },[srg])
  useEffect(() => {
    actions.setGoldList(goldList)
  },[goldList])
  useEffect(() => {
    actions.setLoadWeb3Modal(loadWeb3Modal)
  },[loadWeb3Modal])

  useEffect(() => {
    actions.setStablecoins(stablecoins)
  },[stablecoins])


  useEffect(() => {
    initiateClient(netId);
  }, [netId]);
  useEffect(() => {
    // Goerli

    let newSrg, newGoldList, newColdStaking, newBusd
    if (netId === 5) {
      newSrg = new ethers.Contract(addresses.srg.goerli, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.goerli, abis.goldList, provider);
      newColdStaking = new ethers.Contract(addresses.coldStaking.goerli, abis.coldStaking, provider);
    }
    // Mumbai
    if (netId === 80001) {
      newSrg = new ethers.Contract(addresses.srg.mumbai, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.mumbai, abis.goldList, provider);
      newColdStaking = new ethers.Contract(addresses.coldStaking.mumbai, abis.coldStaking, provider);

    }
    if (netId === 97) {
      newSrg = new ethers.Contract(addresses.srg.bsctestnet, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.bsctestnet, abis.goldList, provider);
      newColdStaking = new ethers.Contract(addresses.coldStaking.mumbai, abis.coldStaking, provider);
    }
    setColdStaking(newColdStaking);
    setSrg(newSrg);
    setGoldList(newGoldList);
  }, [netId]);
  useMemo(async () => {
    if (client) {
      const stablecoinsResult = await getStablecoins();
      const newStablecoins = await Promise.all(
        stablecoinsResult.data.stablecoins.map(async item => {
          const contract = new ethers.Contract(item.id, abis.srg, provider);
          const name = await contract.name();
          console.log(name)
          return ({
            id: item.id,
            name: name
          });
        })
      );
      setStablecoins(newStablecoins);
    }
  }, [client])


  const stakeTokens = async (totalSRG, todalDays) => {
    const signer = provider.getSigner();
    const coldStakingWithSigner = coldStaking.connect(signer);
    const amount = ethers.utils.parseEther(totalSRG).toString()
    let tx;

    tx = await coldStakingWithSigner.stake(amount, todalDays);

    await tx.wait();
  }

  const getExpectedSrg = async (total) => {
    const amount = await goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  return (
    <AppContext.Provider value={{ state, actions }}>
    <Router>
      <MainMenu/>
      {
        netId !== 80001 && netId !== 137 && netId !== 5 &&
        <Box align="center">
          <Layer background="status-error">
            <Box width="medium" pad="large">
              <Text><Anchor color="white" weight="bold" href="https://chainlist.network/" target="_blank">Please connect to polygon network</Anchor></Text>
            </Box>
          </Layer>
        </Box>
      }
      <Box pad={{ top: "xlarge", bottom: "large" }} height="large" style={{
        background: `transparent url(${require('./assets/background.png')}) 0% 0% no-repeat padding-box`,
        backgroundSize: 'cover'
      }}>
        <Routes>
          <Route path="/" element={<Buy/>}/>
          <Route path="/stake" element={<Staking/>}/>
          <Route render={() => {

            return(
              <Navigate to="/" />
            );

          }} />
        </Routes>
      </Box>
      <DappFooter />
      </Router>
    </AppContext.Provider>
  )
}
