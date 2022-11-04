
import {
  Footer,
  Text,
  Box,
  Anchor,
  Image
} from 'grommet';

import SocialMedia from './SocialMedia';
import TrustedBy from './TrustedBy';

export default function DappFooter() {

  return (
    <Footer background="black" height="small"  pad="medium">
      <Text style={{
        font: "normal normal normal 18px/27px Poppins"
      }}>
        © All Rights Reserved - IllumiShare SRG.
      </Text>
      <Anchor href="https://illumisrg.com/" target="_blank" label="About" />
      <TrustedBy />
      <SocialMedia />
    </Footer>
  )
}
