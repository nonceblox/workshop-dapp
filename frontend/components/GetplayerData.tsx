import { getEthersSigner } from "@/ethersConnect";
import { Player } from "@/type";
import { ethers } from "ethers";

import guess from "@/utils/guess.json";



    async function getPlayersGuess(address: string) {
        const provider = await getEthersSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
          guess,
          provider
        );
        const number = await contract.guessedNumber(address);
        return number;
      }
    
      

