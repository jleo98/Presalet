import { useState, useEffect } from 'react';

import {
  Box,
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';


import { Veriff } from '@veriff/js-sdk';
import { createVeriffFrame, MESSAGES } from '@veriff/incontext-sdk';


export default function VeriffLayer(props) {

  const { state } = useAppContext();



  useEffect(() => {
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
                  props.addWallet(state.coinbase, id); // TEST
                  break;
                case MESSAGES.CANCELED:
                  //
                  console.log("canceled")
                  props.setShowVeriff(false);

                  break;
                case MESSAGES.FINISHED:
                  // Add in orbis data
                  props.isUnderVerification(state.coinbase).then(newUnderVerification => {
                    props.setUnderVerification(newUnderVerification)
                  })
                  props.addWallet(state.coinbase, id);
                  props.setShowVeriff(false);
                  props.setShowedNotification(false)
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
