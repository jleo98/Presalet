import React from "react";

import { Image, Box, Paragraph } from "grommet";

const TrustedBy = () => (
  <Box
    direction="row-responsive"
    justify="center"
    align="center"
  >
    <Box basis="medium" align="center" margin="medium">
      <Paragraph size="small" textAlign="center" color="white">
        Secured By
      </Paragraph>
      <Box width="xsmall">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/CYE-logo.svg" fit="cover" />
      </Box>
    </Box>
    <Box basis="medium" align="center" margin="medium">
      <Paragraph size="small" textAlign="center" color="white">
        Audit By
      </Paragraph>
      <Box width="xsmall">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/Cyber-Scope-Logo@2x.d110a0.webp" fit="cover" />
      </Box>
    </Box>
  </Box>
);

export default TrustedBy;
