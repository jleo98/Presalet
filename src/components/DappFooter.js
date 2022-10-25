
import {
  Footer,
  Text,
  Anchor
} from 'grommet';


export default function DappFooter() {

  return (
    <Footer background="black" pad="medium">
      <Text style={{
        font: "normal normal normal 18px/27px Poppins"
      }}>
        © All Rights Reserved - IllumiShare SRG.
      </Text>
      <Anchor label="About" />
    </Footer>
  )
}
