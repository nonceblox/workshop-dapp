# NumberGuess Contract

## Overview
The `NumberGuess` contract is a decentralized game built on the Ethereum blockchain, where players can guess a number within a specified range to win a prize. The contract owner starts the game, and players pay a fee to participate. The winner, who correctly guesses the number, receives the balance of the contract.

## License
This project is licensed under the MIT License.

## Features
- Players guess a number within a specified range.
- A fee is required to participate in the game.
- The game automatically determines the winner and transfers the prize.

## Prerequisites
- Solidity version 0.8.20 or higher.
- An Ethereum development environment (e.g., Remix, Truffle, Hardhat).

## Contract Details

### State Variables
- `Player[] public players`: Array of players who have guessed.
- `mapping(address => uint8) public gusssedNumber`: Tracks guessed numbers by players.
- `mapping(uint8 => bool) public isGuessd`: Tracks whether a number has been guessed.
- `uint256 private numbertoBeGuess`: The number that players are trying to guess.
- `address public winner`: The address of the winner.
- `bool public start`: Indicates whether the game has started.
- `address private owner`: The owner of the contract.
- `uint8 private min`: The minimum number that can be guessed.
- `uint8 private max`: The maximum number that can be guessed.
- `uint gameFee`: The fee required to participate in the game.

### Events
- `event NumberGuessd(address player, uint8 number)`: Emitted when a player guesses a number.

### Constructor
- `constructor(uint fee)`: Initializes the contract with the game fee and sets the contract owner.

### Modifiers
- `modifier onlyOwner()`: Restricts access to certain functions to the contract owner.

### Functions
- `function gameStart() public onlyOwner`: Starts the game and resets the state variables.
- `function guessTheNumber(uint8 number) public payable`: Allows a player to guess a number, ensuring they meet all requirements.
- `function decelareWinner() public`: Declares the winner and transfers the prize.
- `function getPlayers() public view returns(Player[] memory)`: Returns the list of players who have guessed.
- `function _checkWinner() internal view returns (address _winner)`: Checks if there is a winner among the players.
- `function deleteMapping() internal`: Resets the mappings for guessed numbers and players.
- `function _getRandomNumber() internal view returns (uint256)`: Generates a random number within the specified range.

## Usage

1. **Deploy the Contract**: Deploy the contract with the desired game fee.
2. **Start the Game**: The owner calls `gameStart()` to start the game.
3. **Players Guess**: Players call `guessTheNumber(uint8 number)` with their guess and the game fee.
4. **Declare Winner**: Once the maximum number of players have guessed, the owner calls `decelareWinner()` to determine and transfer the prize to the winner.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract NumberGuess {
    // Contract code here...
}
```

## License
MIT License. See `LICENSE` file for details.

---

Feel free to contribute or report issues on the GitHub repository. Enjoy playing the NumberGuess game!
Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
