
import {
  Box,
  Button,
  Heading,
  Text,
  Anchor,
  Meter
} from 'grommet';
import styled from "styled-components";

import { useAppContext } from '../hooks/useAppState';

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.6;
  font: normal normal bold Poppins;

`;

export default function Banner(props) {

  const { state } = useAppContext();

  return (
    <Box align="center">
      <Box pad="small" width="xxlarge" align="center" >
        <StyledText color="#FC0">
          Buy SRG
        </StyledText>
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
      <Box align="center" pad="medium" pad={{top:"large"}}>
        <Text>GoldList Balance {Number(state.goldListBalance)/10**18} SRG</Text>
        <Meter
          background={{
            color: "light-1",
            opacity: "strong"
          }}
          values={[{
            value: state.goldListBalance/(100000*10**18)*100,
            label: 'sixty',
            onClick: () => {}
          }]}
          aria-label="meter"
        />
      </Box>
      <Box align="center">
        {
          !state.coinbase ?
            <Button primary color="#ffcc00" size="small" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" /> :
            <Box>
              <Text size="small">Connected</Text>
              <Text size="xsmall">{state.coinbase}</Text>
              <Text size="xsmall">Your SRG Balance: {Number(state.coinbaseBalance)/10**18} SRG</Text>
            </Box>
        }

      </Box>
    </Box>
  )
}
