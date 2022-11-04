import React, { Fragment } from "react";
import styled from "styled-components";

import { Box, Heading, Text } from "grommet";

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 1.6
`;

const About = () => (
  <Box align="center" style={{paddingBottom: "100px"}}>
    <Box align="center" direction="column" width="large">
        <StyledText color="#FC0" pad={{ top: "small" }} textAlign="center" style={{fontSize:"24px"}}>
          We believe money should give the people both stability and opportunities.
        </StyledText>
    </Box>
  </Box>
);


export default About;
