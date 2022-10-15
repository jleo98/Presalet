// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  srg: {
    goerli: "0x2089115719a623a9281b880f99e9f0ab36c551be",
    bsctestnet: "0xfddf890f727e91862594ef8c97a809e740a2965c"
  },
  busd: {
    bsctestnet: "0x010db179d701b8ccaee5c9afdf0e53f46bab892d"
  },
  goldList: {
    goerli: "0xf68a7fea591bfa6d0e912d9acb0278a7d2cd928d",
    bsctestnet: "0x7737bbb6a5ac144da630b76af02cda6a12702a2f"
  }
};

export default addresses;
