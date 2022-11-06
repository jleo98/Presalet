
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

const StyledGetStartedText = styled(Text)`
  color: var(--unnamed-color-ffcc00);
  text-align: left;
  font: normal normal 600 16px/24px Poppins;
  letter-spacing: 0px;
  color: #FFCC00;
  text-transform: Uppercase;
  opacity: 1;
`;

const StyledGoldListText = styled(Text)`
  color: var(--unnamed-color-707070);
  text-align: left;
  font: normal normal 600 16/24px Poppins;
  letter-spacing: 0px;
  color: #707070;
  text-transform: capitalize;
  opacity: 1;
`;
const StyledBalanceText = styled(Text)`
  color: var(--unnamed-color-ffcc00);
  text-align: left;
  font: normal normal 600 27px/41px Poppins;
  letter-spacing: 0px;
  color: #FFCC00;
  text-transform: capitalize;
  opacity: 1;
`;

const StyledText = styled(Text)`
  text-align: left;
  font: normal normal 600 30px/61px Poppins;
  letter-spacing: 0px;
  text-transform: capitalize;
  opacity: 1;
`;
const StyledBox = styled(Box)`
  background: #16151A 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;

`;

const StyledAnchor = styled(Anchor)`
/* UI Properties */
  color: var(--unnamed-color-707070);
  text-align: left;
  font: normal normal Poppins;
  letter-spacing: 0px;
  color: #707070;
  text-transform: capitalize;
  opacity: 1;
  background: var(--black) 0% 0% no-repeat padding-box;
  border: 1px solid var(--unnamed-color-707070);
  background: #060707 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
`;

export default function Banner(props) {

  const { state } = useAppContext();

  return (
    <Box align="center" pad={{horizontal:"large",vertical:"medium"}} gap="xlarge">

      <Box alignContent="left" pad={{top:"large"}} width="large">
        <StyledGetStartedText color="#FFCC00">
          Get Started
        </StyledGetStartedText>
        <StyledText color="#F1F1F1">
          Buy SRG
        </StyledText>
      </Box>
      <StyledBox align="left" background="#16151A" pad="xlarge" gap="large" width="large" height="xlarge">
        <Box gap="small" height="xsmall">
          <StyledGoldListText>GoldList Balance</StyledGoldListText>
          <StyledBalanceText style={{textAlign:"center"}}>{Number(state.goldListBalance)/10**18} SRG</StyledBalanceText>
        </Box>
        <Meter
          align="center"
          background={{
            color: "light-1",
            opacity: "strong"
          }}
          values={[{
            value: state.goldListBalance/(100000*10**18)*100,
            color:"black",
            label: 'sixty',
            onClick: () => {}
          }]}
          aria-label="meter"
          height="small"
          width="large"
        />
        {
          !state.coinbase &&
            <Button primary color="#ffcc00" size="small" label="Connect" onClick={state.loadWeb3Modal} className="btn-primary" />
        }
      </StyledBox>
    </Box>
  )
}
