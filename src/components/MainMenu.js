
import {
  Header,
  Button,
  Image,
  Anchor
} from 'grommet';


export default function MainMenu(props) {

  return (
    <Header background="none" pad="small" style={{
      boxShadow: "0px 3px 6px #0000001A",
    }}>
      <Anchor href="https://illumisrg.com/" target="_blank">
        <Image
          src={require("../assets/logo.png")}
        />
      </Anchor>
      {
        !props.coinbase ?
        <Button primary label="Connect" color="#ffcc00" className="btn-primary" onClick={props.loadWeb3Modal}/> :
        <Button label="Stake" className="btn-primary" onClick={() => {
          props.setShowStake(!props.showStake)
        }}/>
      }
    </Header>
  )
}
