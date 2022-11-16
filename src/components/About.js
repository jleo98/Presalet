import React from "react";
import styled from "styled-components";

import { Box, Heading, Text, Image } from "grommet";

const StyledText = styled(Text)`
    font: normal normal Poppins;
    letter-spacing: 0px;
    text-transform: capitalize;
    opacity: 1;
`;
const About = () => (


  <Box align="center" height="small " pad={{ top: "large",bottom:"xlarge" }}>
    <Box align="center" width="large" >
        <StyledText color="#F1F1F1" textAlign="center" size="32px" weight="600">
          We believe money should give the people both stability and opportunities.
        </StyledText>
    </Box>
  </Box>
);


export default About;
