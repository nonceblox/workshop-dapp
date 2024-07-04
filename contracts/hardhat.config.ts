import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const config: HardhatUserConfig = {

  
  networks: {

    bsc_testnet :{
      url: "https://rpc.ankr.com/bsc_testnet_chapel",
      chainId: 97,
      accounts: [PRIVATE_KEY]
    }

  },
  solidity: "0.8.20",
};

export default config;
