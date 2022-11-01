
import {
  Box,
  Button,
  Heading,
  Text,
  Anchor
} from 'grommet';


export default function Banner(props) {

  return (
    <>
      <Box pad="medium" width="xxlarge" height="small" align="center" >
        <Heading color="black" size="small" style={{
          font: "normal normal bold 50px/54px Poppins",
          letterSspacing: "0px",
          textTransform: "none"
        }}>
          Buy SRG
        </Heading>
        {
          props.srg &&
            props.netId === 80001 ?
            <Text size="xsmall">SRG Address: <Anchor href={`https://mumbai.polygonscan.com/address/${props.srg.address}`} target="_blank">{props.srg.address}</Anchor></Text> :
            props.netId === 97 ?
              <Text size="xsmall">SRG Address: <Anchor href={`https://testnet.bscscan.com/address/${props.srg.address}`} target="_blank">{props.srg.address}</Anchor></Text> :
              props.netId === 5 &&
              <Text size="xsmall">SRG Address: <Anchor href={`https://goerli.etherscan.io/address/${props.srg.address}`} target="_blank">{props.srg.address}</Anchor></Text>

        }
        {
          props.goldList &&
            props.netId === 80001 ?
            <Text size="xsmall">Gold List Address: <Anchor href={`https://mumbai.polygonscan.com/address/${props.goldList.address}`} target="_blank">{props.goldList.address}</Anchor></Text> :
            props.netId === 97 ?
              <Text size="xsmall">Gold List Address: <Anchor href={`https://testnet.bscscan.com/address/${props.goldList.address}`} target="_blank">{props.goldList.address}</Anchor></Text> :
              props.netId === 5 &&
              <Text size="xsmall">Gold List Address: <Anchor href={`https://goerli.etherscan.io/address/${props.goldList.address}`} target="_blank">{props.goldList.address}</Anchor></Text>

        }
      </Box>
      <Box align="center">
        {
          !props.coinbase ?
            <Button primary color="#ffcc00" size="small" label="Connect" onClick={props.loadWeb3Modal} className="btn-primary" /> :
            <>
              <Text size="small">Connected</Text>
              <Text size="xsmall">{props.coinbase}</Text>
            </>
        }

      </Box>
    </>
  )
}
