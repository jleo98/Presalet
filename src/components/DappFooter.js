
import {
  Footer,
  Text,
  Anchor
} from 'grommet';

import SocialMedia from './SocialMedia';

export default function DappFooter() {

  return (
    <Footer background="black" height="small"  pad="medium">
      <Text style={{
        font: "normal normal normal 18px/27px Poppins"
      }}>
        © All Rights Reserved - IllumiShare SRG.
      </Text>
      <Anchor href="https://illumisrg.com/" target="_blank" label="About" />
      <SocialMedia />
    </Footer>
  )
}
