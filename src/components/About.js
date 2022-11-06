import React, { Fragment } from "react";
import styled from "styled-components";

import { Box, Heading, Text, Image } from "grommet";

const StyledText = styled(Text)`
    font: normal normal 600 38px/62px Poppins;
    letter-spacing: 0px;
    text-transform: capitalize;
    opacity: 1;
`;

const About = () => (
  <Box align="center" pad={{bottom:"large"}}>
    <Box align="center" direction="column" width="large">
        <StyledText color="#F1F1F1" pad={{ top: "small" }} textAlign="center">
          We believe money should give the people both stability and opportunities.
        </StyledText>
    </Box>
  </Box>
);


export default About;
