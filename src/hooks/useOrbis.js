import { useState,useEffect } from "react";
/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";
import { fromString } from 'uint8arrays'

/** Initialize the Orbis class object */
const orbis = new Orbis();

function useOrbis() {
  const [orbisClient, setOrbisClient] = useState();

  useEffect(() => {
    const seed = new Uint8Array(fromString(process.env.REACT_APP_DID_SEED,'base16'))
    orbis.connectWithSeed(seed).then(res => {
      console.log(res)
      setOrbisClient(res);
    });

  },[])

  const addWallet = async(address) => {
    const profile = await orbis.getProfile(orbisClient.did);
    let data = profile.data;
    if(!data){
      data = {}
    }
    if(!data[address]){
      data[address] = true;
    }
    let res = await orbis.updateProfile({
      data: data
    });
    console.log(res)
  }

  return ({ addWallet })
}

export default useOrbis;
