import { useState,useMemo } from 'react';

import {
  Box,
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';
import  useOrbis  from '../hooks/useOrbis';


import { Veriff } from '@veriff/js-sdk';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';


export default function VeriffLayer(props) {

  const { state } = useAppContext();
  const { addWallet } = useOrbis();



  useMemo(() => {
    if(document.getElementById("veriff-root")){
      const veriff = Veriff({
        host: 'https://stationapi.veriff.com',
        apiKey: process.env.REACT_APP_VERIFF_API,
        parentId: 'veriff-root',
        onSession: function(err, response) {
          const url = response.verification.url;
          createVeriffFrame({
            url,
            onEvent: function(msg) {
              switch(msg) {
                case MESSAGES.STARTED:
                  //
                  break;
                case MESSAGES.CANCELED:
                  //
                  break;
                case MESSAGES.FINISHED:
                  // Add in orbis data
                  addWallet(state.coinbase);
                  break;
              }
            }
          })
        }
      });
      veriff.setParams({
        vendorData: state.coinbase
      });
      veriff.mount();
    }
  },[document.getElementById("veriff-root")])

  return (
    <Box pad="large">
      <div id="veriff-root"></div>
    </Box>
  )
}
