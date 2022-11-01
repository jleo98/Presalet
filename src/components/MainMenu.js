
import {
  Header,
  Button,
  Image,
  Box
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
      <Box width="medium">
        <Link to="/">
          <Image
            src={require("../assets/logo.png")}
          />
        </Link>
      </Box>
      <Box width="medium" direction="horizontal">
      {
        !state.coinbase ?
        <Button primary label="Connect" color="#ffcc00" className="btn-primary" onClick={state.loadWeb3Modal}/> :
        <>
        <Link to="/">Buy</Link>
        <Link to="/stake">Stake</Link>
        </>
      }
      </Box>
    </Header>
  )
}
