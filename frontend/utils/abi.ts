export const abi = [
 
  {
    type: 'function',
    name: 'start',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "player",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "gusssedNumber",
            "type": "uint8"
          }
        ],
        "internalType": "struct NumberGuess.Player[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {

    
    type: 'function',
    name: 'gusssedNumber',
    stateMutability: 'view',
    inputs: [ {
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    "inputs": [],
    "name": "winner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  
] as const


