
import {
  Heading,
  Image,
  Box,
} from 'grommet';


export default function Tokenize() {

  const logos = [
    require("../assets/icons/real_estate.png"),
    require("../assets/icons/real_estate.png"),
    require("../assets/icons/real_estate.png")
  ]



  return (
    <Box align="center">
      <Heading style={{
        color:"black",
        font: "normal normal bold 50px/54px Poppins",
        letterSspacing: "0px",
        textTransform: "none"
      }}>
        Tokenize Assets (need images)
      </Heading>
      <Box pad="large">
        <Box direction="row-responsive" wrap={true}>
        {
          logos.map((logo,i) => {
            return(
              <Box width="medium" pad="medium">
                <Image
                  src={logo}
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
