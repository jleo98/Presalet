import React from "react";
import { Anchor, Box } from "grommet";
import { FacebookOption, Instagram, Youtube,Home } from "grommet-icons";

const SocialMedia = () => (
  <Box direction="row" gap="xxsmall" justify="center" alignSelf="center" alignContent="center">
    <Anchor
      icon={<Home color="white" size="medium" />}
      href="https://lumishare.io/"
      target="_blank"
      a11yTitle="Go to Homepage"
    />
    <Anchor
      target="_blank"
      a11yTitle="Share feedback on Github"
      href="https://www.instagram.com/illumishare_srg/"
      icon={<Instagram color="white" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Chat with us on Slack"
      href="https://www.facebook.com/illumiShareSRG"
      icon={<FacebookOption color="white" size="medium" />}
    />
    <Anchor
      target="_blank"
      a11yTitle="Youtube"
      href="https://www.youtube.com/channel/UCvypVekV7dP0EGjbRHSHbUw"
      icon={<Youtube color="white" size="medium" />}
    />
  </Box>
);

export default SocialMedia;
