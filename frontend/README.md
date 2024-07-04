## Getting Started

````
# NumberGuess DApp

## Overview
The NumberGuess DApp is a decentralized application that interacts with the `NumberGuess` smart contract. This DApp allows users to participate in the game by guessing numbers, starting and restarting the game, and declaring the winner.

## Features
- **Start Game**: The contract owner can start the game.
- **Restart Game**: The contract owner can restart the game.
- **Guess Number**: Players can guess a number to win the prize.
- **Declare Winner**: The contract owner can declare the winner and distribute the prize.

## Prerequisites
- Node.js and npm installed.
- A web3-compatible browser or wallet (e.g., MetaMask).
- Access to an Ethereum network (e.g., Mainnet, Ropsten, Ganache).

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/NumberGuessDApp.git
    cd NumberGuessDApp/frontend
    ```

2. **Install Dependencies**
    ```bash
    bun install
    ```

3. **Configure Environment Variables**
    Create a `.env` file in the root directory with the following content:
    ```bash
    REACT_APP_CONTRACT_ADDRESS=<Your_Contract_Address>
    REACT_APP_INFURA_PROJECT_ID=<Your_Infura_Project_ID>
    ```

4. **Run the DApp**
    ```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

## Functions

### Start Game

The owner of the contract can start the game by calling the `start` function. This will initialize the game state and allow players to start guessing numbers.

### Restart Game

The owner can restart the game using the `restart` function. This will reset the game state, allowing a new round of guesses.

### Guess Number

Players can guess a number by calling the `guess` function and paying the required game fee. The number must be within the specified range, and each number can only be guessed once.

### Declare Winner

The owner can declare the winner by calling the `declareWinner` function once the required number of players have guessed. The prize will be transferred to the winner.

## User Interface

The DApp provides a simple and intuitive interface with the following components:

- **Start Button**: Initiates the game.
- **Restart Button**: Resets the game for a new round.
- **Guess Input**: Allows players to enter their guessed number.
- **Guess Button**: Submits the guessed number.
- **Player List**: Displays the list of players and their guessed numbers.
- **Declare Winner Button**: Declares the winner and distributes the prize.

## Usage

1. **Start the Game**

   - The owner clicks the "Start" button to initialize the game.

2. **Make a Guess**

   - Players enter their guessed number in the input field and click the "Guess" button. They must pay the required game fee.

3. **Restart the Game**

   - The owner can click the "Restart" button to reset the game for a new round.

4. **Declare the Winner**
   - Once the required number of players have guessed, the owner clicks the "Declare Winner" button to determine the winner and distribute the prize.

## Contributing

We welcome contributions to enhance the functionality and user experience of the NumberGuess DApp. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Enjoy playing the NumberGuess game and may the best guesser win!
