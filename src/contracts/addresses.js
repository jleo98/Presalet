// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  srg: {
    goerli: "0x8D9a2BFd40B529Ca5F0a60b6606aec376554add0",
    bsctestnet: "0x58C388bb71Ff2a926963cf888Cd793De700d6E9e",
    mumbai: "0x5f4395996479eF6ff57da6f28779Cc8EA2350258",
    bsc: "0x5AE6862B92Fe443D2C4addD9C6e65Fc0C7ccdDc0"
  },
  goldList: {
    goerli: "0xf68a7fea591bfa6d0e912d9acb0278a7d2cd928d",
    bsctestnet: "0x5c19ec2dfd13cbdc5efa34f77f4bc83669604fa6",
    mumbai: "0x1390746a374ED3c7e38eb5D099ef9D6Ed4cA457C",
    bsc: "0xa0139aa6994e9126fa108863d0f314d970306f46" // bsc: "0x38f6dd59ec1269c04df5e4906eddabcf3ed4bca0" version no goldlisted
  },
  coldStaking: {
    goerli: "0x65c307AB0d8a745C8Ba2D81a3436dE16bb4c4050",
    bsctestnet: "0x3D2A57136B2458a175a7eE3C4781dBa5750659D0",
    mumbai: "0xb002d04aee07eF870231D2Ef0CBdD4f936CF0D4E",
    bsc: "0x577B2EecadF6D8cA93237C849d1AF0D0bB0919B1"
  }
};

export default addresses;
