import React from 'react';

import {
  Header,
  Button,
  Image,
  Box,
  Text,
  ResponsiveContext,
  Nav,
  Anchor,
} from 'grommet';
import {
  Link
} from 'react-router-dom';

import { useAppContext } from '../hooks/useAppState';

export default function MainMenu(props) {
  const { state } = useAppContext();
  const size = React.useContext(ResponsiveContext);

  return (
    <Header background="none" pad="small" height="xsmall" style={{
      boxShadow: "0px 3px 6px #0000001A",
    }}>
      <Box width={size}>
        <Link to="/">
          <Image
            src={require("../assets/logo.png")}
            style={{width:"150px"}}
          />
        </Link>
      </Box>
      <Nav align="center" width={size}>
      {
        !state.coinbase ?
        <Button style={{borderRadius: "8px"}} primary size="medium" label="Connect" color="#ffcc00" className="btn-primary" onClick={state.loadWeb3Modal}/> :
        state.whitelisted ?
        <>
          <Text color="white" size="xsmall">Connected</Text>
          {
            window.innerWidth >= 500 &&
            <Text color="white" size="7px">{state.coinbase}</Text>
          }
          <Text color="white" size="8px">Your SRG Balance</Text>
          <Text color="white" size="8px">{Number(state.coinbaseBalance)/10**18} SRG</Text>
        </> :
        <>
        {
          window.innerWidth >= 500 &&
          <Text color="white" size="xsmall">{state.coinbase}</Text>
        }
        <Text color="white" size="small">Unverified</Text>
        </>
      }
      </Nav>
    </Header>
  )
}
