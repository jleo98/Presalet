
import {
  Heading,
  Image,
  Box,
} from 'grommet';


export default function ClientsLogo() {

  const logos = [
    require("../assets/clients_logo/roberto_cavali.png"),
    require("../assets/clients_logo/reblonde.png"),
    require("../assets/clients_logo/royal_family.png"),
    require("../assets/clients_logo/srg.png"),
    require("../assets/clients_logo/visulive.png"),
    require("../assets/clients_logo/peaceful_people.png"),
    require("../assets/clients_logo/european_digital_university.png"),
    require("../assets/clients_logo/edubuk.png"),
    require("../assets/clients_logo/european_blockchain_center.png"),
    require("../assets/clients_logo/crypto_bank.png"),
    require("../assets/clients_logo/ontheblockchain.png"),
    require("../assets/clients_logo/iplena.png"),
    require("../assets/clients_logo/polygon.png"),
    require("../assets/clients_logo/binance.png"),
    require("../assets/clients_logo/class_bazaar.png")
  ]



  return (
    <Box align="center">
      <Heading style={{
        color:"black",
        font: "normal normal bold 50px/54px Poppins",
        letterSspacing: "0px",
        textTransform: "none"
      }}>
        Clients Logos
      </Heading>
      <Box pad="large">
        <Box direction="row-responsive" wrap={true}>
        {
          logos.map((logo,i) => {
            return(
              <Box width="250px" pad="medium">
                <Image
                  src={logo}
                  fill="cover"
                />
              </Box>
            )
          })
        }
        </Box>
      </Box>
    </Box>
  )
}
