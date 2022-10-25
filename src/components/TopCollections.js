
import {
  Box,
  Button,
  Image,
  Heading,
  Card,
  CardBody,
  Text,
  Anchor,
  Spinner
} from 'grommet';


export default function TopColletions(props) {

  return (
    <>
    <Box align="center">
      <Heading style={{
        color:"black",
        font: "normal normal bold 50px/54px Poppins",
        letterSspacing: "0px",
        textTransform: "none",
        textAlign:"center"
      }}>
        Top Collections over last 24 hours
      </Heading>
      <Text>****Under construction, getting data from OpenSea just as DEMO</Text>
      <Anchor href="https://thegraph.com/hosted-service/subgraph/messari/opensea-v2-ethereum" target="_blank">Click to see graph used</Anchor>
    </Box>
    <Box direction="row-responsive" pad="medium" align="center" wrap={true}>
    {
      props.collections?.map((item) => {
        return(
          <Box pad="small">
            <Card  height="141px" width="400px" background="light-1">
              <CardBody>
                <Box direction="row-responsive" align="center" wrap={true}>
                  <Box height="small" width="120px" height="120px">
                    <Image src={item.metadata?.image?.replace("ipfs://","https://ipfs.io/ipfs/")} fit="cover" />
                  </Box>
                  <Box align="center">
                    <Box pad="xsmall">
                      <Text><b>{item.collection.name}</b></Text>
                    </Box>
                    <Box>
                      <Text>{item.collection.metadata?.description}</Text>
                    </Box>
                    <Box>
                      <Text size="xsmall"><b>{item.tokenId}</b></Text>
                    </Box>
                    <Box direction="row-responsive" pad="medium" align="left" wrap={true}>
                      <Box margin="xsmall">
                        <Text size="xsmall">Floor price: {item.priceETH} ETH</Text>
                      </Box>
                      <Box margin="xsmall">
                      {
                        item.collection.totalSupply &&
                        <Text size="xsmall">Supply: {item.collection.totalSupply}</Text>
                      }
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Box>
        )
      })
    }
    </Box>
    {
      !props.collections &&
      <Box align="center" pad="large">
        <Spinner />
        <Text>Loading ...</Text>
      </Box>
    }
    <Box align="center">
    {
      props.collections &&
      <Button primary color="#ffcc00" size="large" label="All Collections" style={{
        font: "normal normal 600 14px/7px Poppins",
        borderRadius: "8px"
      }}/>
    }
    </Box>
    </>
  )
}
