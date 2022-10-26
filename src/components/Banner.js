
import {
  Box,
  Button,
  Paragraph,
  Heading,
  Image,
  Text
} from 'grommet';


export default function Banner(props) {

  return (
    <>
    <Box pad="medium" width="xxlarge" height="small" align="center">
      <Heading color="black" size="small" style={{
        font: "normal normal bold 50px/54px Poppins",
        letterSspacing: "0px",
        textTransform: "none"
      }}>
        Buy SRG
      </Heading>
      <Paragraph size="small" style={{
        font: "normal normal 600 14px/7px Poppins"
      }}>
        Some text here
      </Paragraph>
    </Box>
    <Box align="center">
    {
      !props.coinbase ?
      <Button primary color="#ffcc00" size="large" label="Connect" onClick={props.loadWeb3Modal} style={{
        font: "normal normal 600 14px/7px Poppins",
        borderRadius: "8px"
      }}/> :
      <>
      <Text size="small">Connected</Text>
      <Text size="xsmall">{props.coinbase}</Text>
      </>
    }
    </Box>
    </>
  )
}
