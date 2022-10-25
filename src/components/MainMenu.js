
import {
  Header,
  Button,
  Image,
  TextInput,
  Menu,
} from 'grommet';


export default function MainMenu(props) {

  return (
    <Header background="none" pad="small" style={{
      boxShadow: "0px 3px 6px #0000001A",
    }}>
      <Image
        src={require("../assets/logo.png")}
      />
      <TextInput
        placeholder="type here"
      />
      {
        !props.coinbase ?
        <Button label="Connect" onClick={props.loadWeb3Modal}/> :
        <>
        <Menu
          label=  <Image
                    src={require("../assets/icons/user.png")}
                   />
          items={[
            { label: 'First Action', onClick: () => {} },
            { label: 'Second Action', onClick: () => {} },
          ]}
        />


        <Button icon={
          <Image
            src={require("../assets/icons/wallet.png")}
          />
        } secondary label="Swap" onClick={() => {
            props.setShowSwap(!props.showSwap)
        }}/>
        <Button secondary label="Buy" onClick={() => {
            props.setShowGoldList(!props.showGoldList)
        }}/>
        </>
      }
    </Header>
  )
}
