import React,{useEffect,useState} from "react";

import {
  Box,
  Text,
  Meter,
  ResponsiveContext
} from "grommet";

import { Orbis } from "@orbisclub/orbis-sdk";

let orbis = new Orbis();


const BarMeter = () => {
  const size = React.useContext(ResponsiveContext);
  const [value,setValue] = useState(1);

  useEffect(() => {
    orbis.getProfile("did:key:z6MkvnfbZjkQyENRkmekdNvAFwxW1N2pVDjXzXMFNp4yg2uM").then(({ data, error }) => {
      if(!isNaN(Number(data.profile?.description)) && Number(data.profile?.description) > 0){
        setValue(data.profile?.description);
      }
    });
  },[]);

  return(
    <Box align="center" alignSelf="center" gap="small" float={false}>
      <Box direction="row" gap="xsmall" alignSelf="left" align="left">
        <Text className="exo_heading" size="small" color="white">Progress of LUMI sales</Text>
        <Text className="golden_heading" size="small">{value}%</Text>
      </Box>
      <Meter
        values={[{
          value: value,
          label: value,
        }]}
        thickness="small"
        round={true}
        aria-label="meter"
      />
    </Box>
  )
}



export default BarMeter;
