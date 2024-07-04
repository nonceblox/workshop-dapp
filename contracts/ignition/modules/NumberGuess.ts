import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";


const NumberGuessModule = buildModule("NumberGuessModule", (m) => {
 

  const gameFee = ethers.parseUnits("0.0001","ether");

  const numberGuess = m.contract("NumberGuess", [gameFee], 
  );

  return { numberGuess };
});

export default NumberGuessModule;
