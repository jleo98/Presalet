
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
    <Footer pad="large" direction="row-responsive">
      <Text style={{
        font: "normal normal normal Poppins",
        color: "#F1F1F1",
        textAlign: "center"
      }}>
        © All Rights Reserved - IllumiShare SRG.
      </Text>
      <TrustedBy />
      <SocialMedia />
    </Footer>
  )
}
