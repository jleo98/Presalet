
import {
  Box,
  Button,
  Heading,
  Text,
  Anchor,
  Meter,
  Image
} from 'grommet';
import styled from "styled-components";
import { Code } from "grommet-icons";

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
    <Box align="center" pad="large">
      <Box pad="small" align="center" >
        <Box width="small">
          <Image src="https://illumisrg.io/wp-content/uploads/2022/10/SRG-NEW-Logo-1.d110a0.webp" fit="contain" />
        </Box>
        <StyledText color="#FC0">
          Buy SRG
        </StyledText>
        <Code color="brand" size="medium" />
        <Box direction="row-responsive" gap="medium">
        {
          state.srg &&
            state.netId === 80001 ?
            <Text size="small"><Anchor href={`https://mumbai.polygonscan.com/address/${state.srg.address}`} target="_blank">SRG</Anchor></Text> :
            state.netId === 97 ?
              <Text size="small"><Anchor href={`https://testnet.bscscan.com/address/${state.srg.address}`} target="_blank">SRG </Anchor></Text> :
              state.netId === 5 &&
              <Text size="small"><Anchor href={`https://goerli.etherscan.io/address/${state.srg.address}`} target="_blank">SRG </Anchor></Text>

        }
        {
          state.goldList &&
            state.netId === 80001 ?
            <Text size="small"><Anchor href={`https://mumbai.polygonscan.com/address/${state.goldList.address}`} target="_blank">Gold List </Anchor></Text> :
            state.netId === 97 ?
              <Text size="small"><Anchor href={`https://testnet.bscscan.com/address/${state.goldList.address}`} target="_blank">Gold List </Anchor></Text> :
              state.netId === 5 &&
              <Text size="small"><Anchor href={`https://goerli.etherscan.io/address/${state.goldList.address}`} target="_blank">Gold List </Anchor></Text>

        }
        </Box>
      </Box>
      <Box align="center" pad="medium" pad={{top:"xsmall",bottom:"large"}}>
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
          !state.coinbase &&
            <Button primary color="#ffcc00" size="small" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" /> 
        }
      </Box>
    </Box>
  )
}
