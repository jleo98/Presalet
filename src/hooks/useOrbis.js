import { useState } from "react";
/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";

/** Initialize the Orbis class object */
const orbis = new Orbis();

function useOrbis() {
  const [orbisClient, setOrbisClient] = useState();



  const connectSeed = async (seed) => {
    if(orbisClient){
      await orbis.logout()
    }
    orbis.connectWithSeed(seed).then(res => {
      console.log(res)
      setOrbisClient(res);
      /*
      orbis.updateProfile({

      }); //CLEAN
      */
    });
  }

  const addWallet = async (address, sessionId) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data?.details.profile.data;
    console.log(data)
    if (!data) {
      data = {}
    }
    // if(!data[address.toLowerCase()]){
    data[address.toLowerCase()] = sessionId;
    // }

    let res = await orbis.updateProfile({
      data: data
    });
    console.log(res)
  }

  const removeWallet = async(address) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data?.details.profile.data;
    if (!data) {
      return;
    }
    if(data[address.toLowerCase()]){
     delete data[address.toLowerCase()]
    }

    let res = await orbis.updateProfile({
      data: data
    });
    console.log(data)
    console.log(res)
  }

  const isUnderVerification = async (address) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data?.details.profile.data;
    if (!data) {
      return(false)
    }
    return(data[address.toLowerCase()])
  }

  return ({
    orbisClient,
    connectSeed,
    addWallet,
    isUnderVerification,
    removeWallet
   })
}

export default useOrbis;
