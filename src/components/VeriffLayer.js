import { useState, useMemo } from 'react';

import {
  Box,
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';
import useOrbis from '../hooks/useOrbis';


import { Veriff } from '@veriff/js-sdk';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';


export default function VeriffLayer(props) {

  const { state } = useAppContext();
  const { addWallet } = useOrbis();



  useMemo(() => {
    if (document.getElementById("veriff-root")) {
      const veriff = Veriff({
        host: 'https://stationapi.veriff.com',
        apiKey: process.env.REACT_APP_VERIFF_API,
        parentId: 'veriff-root',
        onSession: function (err, response) {
          console.log(response.verification)
          const url = response.verification.url;
          const id = response.verification.id;
          createVeriffFrame({
            url,
            onEvent: function (msg) {
              switch (msg) {
                case MESSAGES.STARTED:
                  //
                  addWallet(state.coinbase, id); // TEST

                  break;
                case MESSAGES.CANCELED:
                  //
                  console.log("canceled")
                  //addWallet(state.coinbase,id); // TEST
                  break;
                case MESSAGES.FINISHED:
                  // Add in orbis data
                  addWallet(state.coinbase, id);
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
  }, [document.getElementById("veriff-root")])

  return (
    <Box pad="large">
      <div id="veriff-root"></div>
    </Box>
  )
}
