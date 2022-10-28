import { useState, useEffect,useMemo } from 'react';

import {
  Box,
  RadioButtonGroup
} from 'grommet';
import { ethers } from "ethers";
//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';



import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';

import MainMenu from './components/MainMenu';
import Banner from './components/Banner';
import GoldListModal from './components/GoldListModal';
import Stablecoins from './components/Stablecoins';

import DappFooter from './components/DappFooter';

import abis from "./contracts/abis";
import addresses from "./contracts/addresses";

export default function App() {

  const { state, actions } = useAppState();

  const [srg,setSrg] = useState();
  const [goldList,setGoldList] = useState();
  const [busd,setBusd] = useState();
  const [stablecoins,setStablecoins] = useState();
  const [value,setValue] = useState("Native");


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
    getStablecoins
  } = useGraphClient();



  useEffect(() => {
    initiateClient(netId);
  },[netId]);
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
      //const newBusd = new ethers.Contract(addresses.busd.bsctestnet,abis.srg,provider);

      setSrg(newSrg);
      setGoldList(newGoldList);
      //setBusd(newBusd);
    }
  },[netId]);
  useMemo(async () => {
    if(client){
      const stablecoinsResult = await getStablecoins();
      const newStablecoins = await Promise.all(
        stablecoinsResult.data.stablecoins.map(async item => {
          const contract = new ethers.Contract(item.id,abis.srg,provider);
          const name = await contract.name();
          console.log(name)
          return({
            id: item.id,
            name: name
          });
        })
      );
      setStablecoins(newStablecoins);
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
      <Box pad={{top: "xlarge",bottom:"large"}} height="large" style={{
        background: `transparent url(${require('./assets/background.png')}) 0% 0% no-repeat padding-box`,
        backgroundSize: 'cover'
      }}>
        <Banner
          coinbase={coinbase}
          loadWeb3Modal={loadWeb3Modal}
          setShowGoldList={setShowGoldList}
          showGoldList={showGoldList}
        />
        <Box align="center" pad="medium">
          <RadioButtonGroup
            name="payment"
            options={['Native', 'Stablecoin']}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Box>
        {
          stablecoins && value === "Stablecoin" &&
          <Stablecoins
            provider={provider}
            stablecoins={stablecoins}
            setBusd={setBusd}
          />
        }
        {
          coinbase &&
          (
            value === "Native" ||
            (
              value === "Stablecoin" && busd
            )
          ) &&
          <GoldListModal
            value={value}
            provider={provider}
            coinbase={coinbase}
            netId={netId}
            buyTokens={buyTokens}
            setShow={setShowGoldList}
            getExpectedSrg={getExpectedSrg}
          />
        }
      </Box>
      <DappFooter />
    </AppContext.Provider>
  )
}
