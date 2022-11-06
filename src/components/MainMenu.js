
import {
  Header,
  Button,
  Image,
  Box,
  Text,
  ResponsiveContext,
  Menu,
  Anchor,
} from 'grommet';
import {
  Link
} from 'react-router-dom';

import { useAppContext } from '../hooks/useAppState';

export default function MainMenu(props) {
  const { state } = useAppContext();

  return (
    <Header background="none" pad="small" style={{
      boxShadow: "0px 3px 6px #0000001A",
    }}>
      <Box>
        <Link to="/">
          <Image
            src={require("../assets/logo.png")}
            style={{width:"200px"}}
          />
        </Link>
      </Box>
      <Box
        margin={{ left: "medium" }}
        round="xsmall"
        background={{ color: "white", opacity: "weak" }}
        direction="column"
        align="center"
        pad={{ horizontal: "small" }}
      >
      {
        !state.coinbase ?
        <Button primary label="Connect" color="#ffcc00" className="btn-primary" onClick={state.loadWeb3Modal}/> :
        state.whitelisted ?
        <>
          <Text color="white" size="small">Connected</Text>
          <Text color="white" size="xsmall">{state.coinbase}</Text>
          <Text color="white" size="xsmall">Your SRG Balance: {Number(state.coinbaseBalance)/10**18} SRG</Text>
        </> :
        <>
        <Text color="white" size="xsmall">{state.coinbase}</Text>
        <Text color="white">Unverified</Text>
        </>
      }
      </Box>
    </Header>
  )
}
