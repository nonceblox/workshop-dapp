import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("NumberGuess", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNumberGuessFixture() {
   
   


    // Contracts are deployed using the first signer/account by default
    const [owner, ...otherAccounts] = await hre.ethers.getSigners();
    const gameFee = ethers.parseUnits("0.0001","ether");
    const NumberGuess = await hre.ethers.getContractFactory("NumberGuess");
    const numberGuess = await NumberGuess.deploy(gameFee );

    return {gameFee, numberGuess, owner, otherAccounts };
  }

 

  describe("Withdrawals", function () {

     
    describe("Validations", async function () {

      

      it("Should start the game and set the random number", async function () {
        const {gameFee, numberGuess, owner, otherAccounts } = await loadFixture(deployNumberGuessFixture)
        await numberGuess.gameStart();
        expect(await numberGuess.start()).to.be.true;
      });
    
      it("Should allow players to guess the number", async function () {
        const {gameFee, numberGuess, owner, otherAccounts } = await loadFixture(deployNumberGuessFixture)
        await numberGuess.gameStart();
    
        await expect(
          numberGuess.connect(otherAccounts[0]).guessTheNumber(1, { value: gameFee })
        ).to.emit(numberGuess, "NumberGuessd").withArgs(otherAccounts[0].address, 1);
    
        expect(await numberGuess.gusssedNumber(otherAccounts[0].address)).to.equal(1);
        expect(await numberGuess.isGuessd(1)).to.be.true;
      });
    
      it("Should not allow the owner to guess the number", async function () {
        const {gameFee, numberGuess, owner, otherAccounts } = await loadFixture(deployNumberGuessFixture)
        await numberGuess.gameStart();
        await expect(numberGuess.guessTheNumber(1, { value: gameFee })).to.be.revertedWith("owner not allowed");
      });
    
      it("Should not allow to guess the same number twice", async function () {
        const {gameFee, numberGuess, owner, otherAccounts } = await loadFixture(deployNumberGuessFixture)
        await numberGuess.gameStart();
        await numberGuess.connect(otherAccounts[0]).guessTheNumber(1, { value: gameFee });
        await expect(numberGuess.connect(otherAccounts[1]).guessTheNumber(1, { value: gameFee })).to.be.revertedWith("number already  guessd");
      });
    
      it("Should declare the winner correctly", async function () {
        const {gameFee, numberGuess, owner, otherAccounts } = await loadFixture(deployNumberGuessFixture)
        await numberGuess.gameStart();
    
        await numberGuess.connect(otherAccounts[0]).guessTheNumber(1, { value: gameFee });
        await numberGuess.connect(otherAccounts[1]).guessTheNumber(2, { value: gameFee });
        await numberGuess.connect(otherAccounts[2]).guessTheNumber(3, { value: gameFee });
        await numberGuess.connect(otherAccounts[3]).guessTheNumber(4, { value: gameFee });
        await numberGuess.connect(otherAccounts[4]).guessTheNumber(5, { value: gameFee });
    
        await expect(numberGuess.decelareWinner()).to.changeEtherBalance(
          numberGuess.target, 
          -(Number(gameFee)*5)
        ); // assuming otherAccounts[0] wins
        
      });
     
    });

    describe("Events", function () {
      
    });

    describe("Transfers", function () {
      
    });
  });
});
