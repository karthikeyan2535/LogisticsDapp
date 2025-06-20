require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },

    holesky: {
      url: process.env.HOLESKY_RPC_URL, // 👈 Make sure to set this in .env
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 17000,
    },
  },
};
