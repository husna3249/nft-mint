/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const PrivateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/6240397d7e184c2f8e23cd46f414fb77`,
      accounts: [PrivateKey],
    },
  },
};
