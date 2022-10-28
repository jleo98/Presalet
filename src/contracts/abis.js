import erc721Abi from "./abis/ERC721Abi.json";
import srgAbi from "./abis/SrgAbi.json";
import goldListMaticAbi from "./abis/GoldListMaticAbi.json";
import goldListBSCAbi from "./abis/GoldListBSCAbi.json";
import coldStaking from "./abis/ColdStaking.json";

const abis = {
  erc721: erc721Abi,
  srg: srgAbi,
  goldListMatic: goldListMaticAbi,
  goldListBSC: goldListBSCAbi,
  coldStaking: coldStaking
};

export default abis;
