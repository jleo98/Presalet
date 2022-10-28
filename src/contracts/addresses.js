// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  srg: {
    goerli: "0x2089115719a623a9281b880f99e9f0ab36c551be",
    bsctestnet: "0xfddf890f727e91862594ef8c97a809e740a2965c",
    mumbai: "0x4b595673a06d7a58a0f7c8055797a88d3d27b8c0"
  },
  stable: {
    busd: {
      bsctestnet: "0xd0d96d19b1fcfc2f6e7a6f0029f329eea71563ab"
    },
    usdtd: {
      bsctestnet: "0xd0d96d19b1fcfc2f6e7a6f0029f329eea71563ab"
    },
    dai: {
      bsctestnet: "0xd0d96d19b1fcfc2f6e7a6f0029f329eea71563ab"
    }
  },
  goldList: {
    goerli: "0xf68a7fea591bfa6d0e912d9acb0278a7d2cd928d",
    bsctestnet: "0x5c19ec2dfd13cbdc5efa34f77f4bc83669604fa6",
    mumbai: "0xb16d182897c8AF9f7d21076e7eb116742f5DCF56"
  }
};

export default addresses;
