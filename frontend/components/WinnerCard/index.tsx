import { getEthersSigner } from "@/ethersConnect";
import { Player } from "@/type";
import { abi } from "@/utils/abi";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useReadContract } from "wagmi";

import guess from "@/utils/guess.json";
import { Button } from "@nextui-org/react";
import { zeroAddress } from "viem";

const WinnerCard: React.FC = () => {
;
  const playerslist = useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
    functionName: "getPlayers",
  });

  const winner = useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
    functionName: "winner",
  });


  

  const WinnerButton = async () => {
    try {
      if (playerslist.data?.length == 2) {
        const provider = await getEthersSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
          guess,
          provider
        );

       

        const tx = await contract.decelareWinner();
        await tx.wait()
        console.log(tx);
       
      } else {
        alert("not enough players");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestart = async () => {
    

    if (winner?.data) {
      const provider = await getEthersSigner();

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
        guess,
        provider
      );

      const tx = await contract.gameStart();
      await tx.wait();

      console.log(tx);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Winner Card</h2>

      { (playerslist.data?.length==2 && winner.data==zeroAddress) && <button
        onClick={WinnerButton}
        className="mb-4 p-2 bg-green-500 text-white rounded"
      >
        Declare Winner
      </button>}

      <div className="space-y-2">
        <div className="p-2 bg-white rounded shadow">
          <p>Winner: {winner?.data}</p>
        </div>
       {(winner?.data != zeroAddress && winner?.data != undefined) &&  <Button color="warning" onClick={handleRestart}>
         Restart
       </Button>}
      </div>
    </div>
  );
};

export default WinnerCard;
