
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
          />
        </Link>
      </Box>
      <Box direction="row" gap="xxsmall" justify="center">
      {
        !state.coinbase ?
        <Button primary label="Connect" color="#ffcc00" className="btn-primary" onClick={state.loadWeb3Modal}/> :
        state.whitelisted ?
        <>
        <ResponsiveContext.Consumer>
        {responsive =>
          responsive === "small" ? (
            <Menu
              dropAlign={{ right: "right", top: "top" }}
              label="Menu"
              items={[
                { label: "Buy", href: "#/"},
                { label: "Stake", href: "#/stake" }
              ]}
            />
          ) : (
            <Box
              margin={{ left: "medium" }}
              round="xsmall"
              background={{ color: "white", opacity: "weak" }}
              direction="row"
              align="center"
              pad={{ horizontal: "small" }}
            >
              <Anchor as={Link} to="/buy" label="Buy" margin="small" />
            </Box>
          )
        }
        </ResponsiveContext.Consumer>
        {
          /*
          <Link to="/">Buy</Link>
          <Link to="/stake">Stake</Link>
          */
        }
        </> :
        <Text>Unverified</Text>
      }
      </Box>
    </Header>
  )
}
