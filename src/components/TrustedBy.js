import React from "react";

import { Image, Box, Paragraph,Anchor } from "grommet";

const TrustedBy = () => (
  <Box
    direction="row-responsive"
    justify="center"
    align="center"
  >
    <Box align="center" margin="medium" size="small">
      <Paragraph size="small" textAlign="center" color="white" style={{font: "normal normal normal 18px/27px Poppins"}}>
        Secured By
      </Paragraph>
      <Box width="xsmall" as={Anchor} href="https://cyesec.com/" target="_blank">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/CYE-logo.svg" fit="cover" />
      </Box>
    </Box>
    <Box align="center" margin="medium">
      <Paragraph size="small" textAlign="center" color="white" style={{font: "normal normal normal 18px/27px Poppins"}}>
        Audit By
      </Paragraph>
      <Box width="xsmall" as={Anchor} href="https://www.certik.com/" target="_blank">
        <Image src={require("../assets/certik-logo.png")} fit="cover" />
      </Box>
    </Box>
  </Box>
);

export default TrustedBy;
