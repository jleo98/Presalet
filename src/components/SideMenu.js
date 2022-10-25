
import {
  Sidebar,
  Nav,
  Box,
  Button,
  Image
} from 'grommet';


export default function SideMenu(props) {

  return (
    <Sidebar background="none" width="medium"
      header={
        <Box width="small" align="center">
        {
          !props.coinbase ?
          <Button primary color="#ffcc00" size="large" label="Connect" onClick={props.loadWeb3Modal} style={{
            font: "normal normal 600 14px/7px Poppins",
            borderRadius: "8px"
          }}/> :
          <Button primary color="#ffcc00" size="large" label="Create" style={{
            font: "normal normal 600 14px/7px Poppins",
            borderRadius: "8px"
          }}/>
        }

        </Box>
      }
    >
      <Nav gap="small" style={{
        alignItems: "flex-start"
      }}>
        <Button icon={
          <Image
            src={require("../assets/icons/real_estate.png")}
          />
        } label="Real State" hoverIndicator style={{
          border: "none",
          textAlign: "left",
          font: "normal normal 600 14px/7px Poppins"
        }} />
        <Button icon={
          <Image
            src={require("../assets/icons/meta_estate.png")}
          />
        } label="Meta State" hoverIndicator style={{
          border: "none",
          textAlign: "left",
          font: "normal normal 600 14px/7px Poppins"
        }}/>

        <Button icon={
          <Image
            src={require("../assets/icons/gold_diamonds.png")}
          />
        } label="Gold & Diamonds" hoverIndicator style={{
          border: "none",
          textAlign: "left",
          font: "normal normal 600 14px/7px Poppins"
        }}/>

        <Button icon={
          <Image
            src={require("../assets/icons/mines.png")}
          />
        } label="G & D Mines" hoverIndicator style={{
          border: "none",
          textAlign: "left",
          font: "normal normal 600 14px/7px Poppins"
        }}/>

        <Button icon={
          <Image
            src={require("../assets/icons/agriculture.png")}
          />
        } label="Smart Agriculture" hoverIndicator style={{
          border: "none",
          textAlign: "left",
          font: "normal normal 600 14px/7px Poppins"
        }}/>


      </Nav>
    </Sidebar>
  )
}
