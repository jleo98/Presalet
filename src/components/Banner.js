
import {
  Box,
  Button,
  Paragraph,
  Heading,
  Image
} from 'grommet';


export default function Banner(props) {

  return (
    <Box direction="row-responsive" pad={{top: "xlarge",bottom:"xlarge"}} style={{
      background: `transparent url(${require('../assets/background.png')}) 0% 0% no-repeat padding-box`,
      backgroundSize: 'cover'
    }}>
      <Box pad="medium" width="xlarge">
        <Heading color="black" size="small" style={{
          font: "normal normal bold 50px/54px Poppins",
          letterSspacing: "0px",
          textTransform: "none"
        }}>
          Discover, collect, and sell extraordinary NFTs
        </Heading>
        <Paragraph size="small" style={{
          font: "normal normal 600 14px/7px Poppins"
        }}>
          Explore on the world's best & largest NFT marketplace
        </Paragraph>
        <Box width="small">
        {
          !props.coinbase ?
          <Button primary color="#ffcc00" size="large" label="Connect" onClick={props.loadWeb3Modal} style={{
            font: "normal normal 600 14px/7px Poppins",
            borderRadius: "8px"
          }}/> :
          <Button primary color="#ffcc00" size="large" label="Create" style={{
            font: "normal normal 600 14px/7px Poppins",
            borderRadius: "8px"
          }}/>
        }
        </Box>
      </Box>
      <Box pad="medium" >
        <Image
          src={require("../assets/background-header.png")}
        />
      </Box>
    </Box>
  )
}
