
import {
  Box,
  Button,
  Heading,
  Text,
  Anchor
} from 'grommet';

import { useAppContext } from '../hooks/useAppState';

export default function Banner(props) {

  const { state } = useAppContext();

  return (
    <>
      <Box pad="medium" width="xxlarge" height="small" align="center" >
        <Heading color="black" size="small" style={{
          font: "normal normal bold 50px/54px Poppins",
          letterSspacing: "0px",
          textTransform: "none"
        }}>
          Buy SRG
        </Heading>
        {
          state.srg &&
            state.netId === 80001 ?
            <Text size="xsmall">SRG Address: <Anchor href={`https://mumbai.polygonscan.com/address/${state.srg.address}`} target="_blank">{state.srg.address}</Anchor></Text> :
            state.netId === 97 ?
              <Text size="xsmall">SRG Address: <Anchor href={`https://testnet.bscscan.com/address/${state.srg.address}`} target="_blank">{state.srg.address}</Anchor></Text> :
              state.netId === 5 &&
              <Text size="xsmall">SRG Address: <Anchor href={`https://goerli.etherscan.io/address/${state.srg.address}`} target="_blank">{state.srg.address}</Anchor></Text>

        }
        {
          state.goldList &&
            state.netId === 80001 ?
            <Text size="xsmall">Gold List Address: <Anchor href={`https://mumbai.polygonscan.com/address/${state.goldList.address}`} target="_blank">{state.goldList.address}</Anchor></Text> :
            state.netId === 97 ?
              <Text size="xsmall">Gold List Address: <Anchor href={`https://testnet.bscscan.com/address/${state.goldList.address}`} target="_blank">{state.goldList.address}</Anchor></Text> :
              state.netId === 5 &&
              <Text size="xsmall">Gold List Address: <Anchor href={`https://goerli.etherscan.io/address/${state.goldList.address}`} target="_blank">{state.goldList.address}</Anchor></Text>

        }
      </Box>
      <Box align="center">
        {
          !state.coinbase ?
            <Button primary color="#ffcc00" size="small" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" /> :
            <>
              <Text size="small">Connected</Text>
              <Text size="xsmall">{state.coinbase}</Text>
            </>
        }

      </Box>
    </>
  )
}
