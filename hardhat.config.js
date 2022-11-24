require("@nomicfoundation/hardhat-toolbox")
const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },

    mainnet: {
      url: "https://mainnet.infura.io/v3/f2cb71aa31da49798eeb973bd595c3be",
      accounts: [privateKey],
    },
  },

  paths: {
    sources: "./contracts",
  },
}
