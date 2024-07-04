// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract NumberGuess {

    struct Player {
        address player;
        uint8 gusssedNumber;

    }
    Player[] public players;
    mapping(address => uint8) public gusssedNumber;
    mapping(uint8 => bool) public isGuessd;
    uint256 private numbertoBeGuess;
    address public winner;
    bool public start = false;
    address private owner;
    uint8 private min = 1;
    uint8 private max = 2;
    uint gameFee = 0;
  

    event NumberGuessd(address player, uint8 number);

    constructor(uint fee) {
        gameFee = fee;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner");
        _;
    }

    function gameStart() public onlyOwner {
        start = true;
        deleteMapping();
        delete players;
        numbertoBeGuess = _getRandomNumber();
        winner = address(0);
    }

    function guessTheNumber(uint8 number) public payable {
        require(start, "game not started");
        require(!isGuessd[number], "number already  guessd");
        require(msg.sender != owner, "owner not allowed");
        require(msg.value == gameFee, "pay the game fee");
        require(gusssedNumber[msg.sender] == 0, "you already guessed");


        require(
            number <= max && number >= min,
            "number must be between min and max"
        );

        gusssedNumber[msg.sender] = number;
        isGuessd[number] = true;
        players.push(Player(msg.sender,number));
        emit NumberGuessd(msg.sender, number);
    }

    function decelareWinner() public {
        require(players.length == max, "more players needed");

        

        winner = _checkWinner();
        
        (bool success, ) = winner.call{value: address(this).balance}("");
        require(success, "failed");

    }

    function getPlayers() public view returns(Player[] memory ){
        return players;

    }

    function _checkWinner() internal view returns (address _winner) {
        for (uint i = 0; i < players.length; i++) {
            if (numbertoBeGuess == gusssedNumber[players[i].player]) {
                _winner = players[i].player;
            }
        }
    }

     function deleteMapping() internal  {
        for (uint i = 0; i < players.length; i++) {

            delete gusssedNumber[players[i].player];
            delete isGuessd[players[i].gusssedNumber];
            
        }
    }


    function _getRandomNumber() internal view returns (uint256) {
        uint256 randomNumber = (uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
        ) % (max - min + 1)) + min;
        return randomNumber;
    }
}
