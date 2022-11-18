import { useState, useEffect, useMemo, useCallback } from 'react';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import {
  Box,
  Layer,
  Text,
  Anchor,
  ThemeContext
} from 'grommet';
import { ethers } from "ethers";

//import { User,Connect,Nodes,Help,Projects,Clock } from 'grommet-icons';


import { AppContext, useAppState } from './hooks/useAppState'

import useWeb3Modal from './hooks/useWeb3Modal'
import useGraphClient from './hooks/useGraphClient';

import Buy from './pages/PreSale';

import MainMenu from './components/MainMenu';
import DappFooter from './components/DappFooter';

import abis from "./contracts/abis";
import addresses from "./contracts/addresses";

export default function App() {

  const { state, actions } = useAppState();

  const [srg, setSrg] = useState();
  const [goldList, setGoldList] = useState();
  const [stablecoins, setStablecoins] = useState();


  const {
    provider,
    coinbase,
    netId,
    loadWeb3Modal
  } = useWeb3Modal();

  const {
    client,
    initiateClient,
    getStablecoins
  } = useGraphClient();


  const getStablecoinsBalance = useCallback(async () => {
    if (!stablecoins) return;

    const stableCoinsList = stablecoins.map((stableCoin) => stableCoin.id);

    let balance;
    for (const stablecoin of stableCoinsList) {
      let erc20 = new ethers.Contract(stablecoin.id, abis.srg, provider);
      balance += ethers.utils.formatEther(await erc20.balanceOf(state.coinbase));
    }
    return (balance);

  }, [provider, stablecoins, state.coinbase])


  useEffect(() => {
    actions.setProvider(provider)
  }, [provider])
  useEffect(() => {
    actions.setCoinbase(coinbase)
  }, [coinbase]);


  useEffect(() => {
    actions.setGetStablecoinsBalance(getStablecoinsBalance);
  }, [getStablecoinsBalance])

  useEffect(() => {
    if (coinbase && goldList) {
      goldList.goldList(coinbase).then(newWhitelisted => {
        actions.setWhitelisted(newWhitelisted);
        goldList.on("GoldListAddition", async (address, status) => {
          if (coinbase.toLowerCase() === address.toLowerCase()) {
            const newWhitelisted = await goldList.goldList(coinbase);
            actions.setWhitelisted(newWhitelisted);
          }
        });
      })
    }
  }, [coinbase, goldList]);
  useEffect(() => {
    if (coinbase && srg) {
      srg.balanceOf(coinbase).then(newBalance => {
        actions.setCoinbaseBalance(newBalance);
        srg.on("Transfer", async (from, to, value) => {
          if (
            from.toLowerCase() === coinbase.toLowerCase() ||
            to.toLowerCase() === coinbase.toLowerCase()
          ) {
            const newBalance = await srg.balanceOf(coinbase);
            actions.setCoinbaseBalance(newBalance);
          }
        });
      });
    }
  }, [coinbase, srg]);

  useEffect(() => {
    if (goldList && srg) {
      srg.balanceOf(goldList.address).then(newGoldListBalance => {
        actions.setGoldListBalance(newGoldListBalance.toString());
        srg.on("Transfer", async (from, to, value) => {
          if (
            from.toLowerCase() === goldList.address.toLowerCase() ||
            to.toLowerCase() === goldList.address.toLowerCase()
          ) {
            const newGoldListBalance = await srg.balanceOf(goldList.address);
            actions.setGoldListBalance(newGoldListBalance.toString());
          }
        });
      });
    }
  }, [goldList, srg]);
  useEffect(() => {
    actions.setNetId(netId)
  }, [netId])
  useEffect(() => {
    actions.setSrg(srg)
  }, [srg])
  useEffect(() => {
    actions.setGoldList(goldList)
  }, [goldList])
  useEffect(() => {
    actions.setLoadWeb3Modal(loadWeb3Modal)
  }, [loadWeb3Modal])

  useEffect(() => {
    actions.setStablecoins(stablecoins)
  }, [stablecoins])


  useEffect(() => {
    initiateClient(netId);
  }, [netId]);
  useEffect(() => {
    // Goerli

    let newSrg, newGoldList, newColdStaking
    if (netId === 5) {
      newSrg = new ethers.Contract(addresses.srg.goerli, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.goerli, abis.goldList, provider);
    }
    // Mumbai
    if (netId === 80001) {
      newSrg = new ethers.Contract(addresses.srg.mumbai, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.mumbai, abis.goldList, provider);

    }
    if (netId === 97) {
      newSrg = new ethers.Contract(addresses.srg.bsctestnet, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.bsctestnet, abis.goldList, provider);
      newColdStaking = new ethers.Contract(addresses.coldStaking.mumbai, abis.coldStaking, provider);
    }

    if (netId === 56) {
      newSrg = new ethers.Contract(addresses.srg.bsc, abis.srg, provider);
      newGoldList = new ethers.Contract(addresses.goldList.bsc, abis.goldList, provider);
    }
    setSrg(newSrg);
    setGoldList(newGoldList);
  }, [netId]);
  useMemo(async () => {
    if (client && !stablecoins) {
      const stablecoinsResult = await getStablecoins();
      console.log(stablecoinsResult)
      const newStablecoins = await Promise.all(
        stablecoinsResult.data.stablecoins.map(async item => {
          const contract = new ethers.Contract(item.id, abis.srg, provider);
          const name = await contract.name();
          const symbol = await contract.symbol();
          console.log(symbol)
          return ({
            id: item.id,
            name: name,
            symbol: symbol
          });
        })
      );
      setStablecoins(newStablecoins);
    }
  }, [client, stablecoins])



  const getExpectedSrg = async (total) => {
    const amount = await goldList.getAmountOfTokens(ethers.utils.parseEther(total).toString());
    return (amount.toString() / 10 ** 18);
  }

  return (
    <AppContext.Provider value={{ state, actions }} >
      <ThemeContext.Extend
        value={
          {
            global: {
              hover: {
                color: "white"
              },
              colors: {
                control: '#ffcc00'
              },
              font: {
                weight: 600,
                family: "Poppins"
              }
            },
            select: {
              options: {
                text: {
                  color: "#ffcc00"
                }
              },
              clear: {
                text: {
                  color: "black"
                }
              },
              control: {
                extend: {
                  color: "black"
                }
              }
            }
          }
        }
      >
        <Router >
          <Box className="coins-bg">
            <MainMenu />
            {
              netId !== 80001 && netId !== 137 && netId !== 5 && netId !== 56 &&
              <Box align="center" >
                <Layer background="status-error" responsive={false}>
                  <Box width="medium" pad="large">
                    <Text textAlign="center"><Anchor color="white" weight="bold" href="https://chainlist.network/" target="_blank">Please connect to Binance Smart Chain network</Anchor></Text>
                  </Box>
                </Layer>
              </Box>
            }
            <Box pad={{ top: "xxsmall", bottom: "large" }} height="large" >
              <Routes>
                <Route path="/:uri" element={<Buy />} />
                <Route path="/" element={<Buy />} />

                <Route render={() => {

                  return (
                    <Navigate to="/" />
                  );

                }} />
              </Routes>
            </Box>
            <DappFooter height="small" />
          </Box>
        </Router>
      </ThemeContext.Extend>
    </AppContext.Provider>
  )
}
