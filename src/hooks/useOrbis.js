import { useState, useEffect } from "react";
/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";
import { fromString } from 'uint8arrays'

/** Initialize the Orbis class object */
const orbis = new Orbis();

function useOrbis() {
  const [orbisClient, setOrbisClient] = useState();

  useEffect(() => {
    const seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED, 'base16'))
    orbis.connectWithSeed(seed).then(res => {
      console.log(res)
      setOrbisClient(res);
      /*
      orbis.updateProfile({

      }); //CLEAN
      */
    });

  }, [])

  const addWallet = async (address, sessionId) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data.details.profile.data;
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

  const isUnderVerification = async (address) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data.details.profile.data;
    if (!data) {
      return (false)
    }
    return (data[address.toLowerCase()])
  }

  return ({ addWallet, isUnderVerification })
}

export default useOrbis;
