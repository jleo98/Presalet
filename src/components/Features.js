import React from "react";

import { Anchor, Box, Heading, Paragraph, Text,Image } from "grommet";

const Features = () => (
  <Box
    direction="row-responsive"
    justify="center"
    align="center"
    margin={{ top: "xsmall",bottom:"xxlarge"}}
  >
    <Box basis="medium" align="center" margin="medium">
      <Box height="small" align="center" justify="center">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/Physical-Gold-icon@2x.d110a0.webp" fit="contain" />
      </Box>
      <Paragraph size="small" textAlign="center">
        Physical gold reserve
      </Paragraph>
    </Box>
    <Box basis="medium" align="center" margin="medium">
      <Box height="small" align="center" justify="center">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/Recovery-Fund-icon@2x-1.d110a0.webp" fit="contain" />
      </Box>
      <Paragraph size="small" textAlign="center">
        Aggressive marketing.
      </Paragraph>
    </Box>
    <Box basis="medium" align="center" margin="medium">
      <Box height="small" align="center" justify="center">
        <Image src="https://illumisrg.io/wp-content/uploads/2022/07/Technology-icon@2x.d110a0.webp" fit="cover" />
      </Box>
      <Box size="small" textAlign="center">
        <Text size="small">Locking, Staking and Auto burn mechanisms</Text>

      </Box>
    </Box>
  </Box>
);

export default Features;
