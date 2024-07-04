import { getEthersSigner } from "@/ethersConnect";
import { abi } from "@/utils/abi";
import { ethers } from "ethers";
import React from "react";
import { useReadContract } from "wagmi";
import guess from "@/utils/guess.json";
import { Button } from "@nextui-org/react";
import { zeroAddress } from "viem";

const WinnerCard: React.FC = () => {
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
      debugger
      if (playerslist.data?.length == 2) {
        const provider = await getEthersSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
          guess,
          provider
        );

        const tx = await contract.decelareWinner();
        await tx.wait();
        console.log(tx);
        alert("Winner declared successfully!");
        window.location.reload();
      } else {
        alert("Not enough players");
      }
    } catch (error) {
      console.error("Error declaring winner:", error);
      alert("Failed to declare winner. Please try again.");
    }
  };

  const handleRestart = async () => {
    try {
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
        alert("Game restarted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error restarting game:", error);
      alert("Failed to restart game. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Winner Card</h2>

      {playerslist.data?.length === 2 && winner.data === zeroAddress && (
        <Button onClick={WinnerButton} className="mb-4 p-2 bg-green-500 text-white rounded">
          Declare Winner
        </Button>
      )}

      <div className="space-y-2">
        <div className="p-2 bg-white rounded shadow">
          <p>Winner: {winner?.data}</p>
        </div>
        {winner?.data !== zeroAddress && winner?.data !== undefined && (
          <Button color="warning" onClick={handleRestart}>
            Restart
          </Button>
        )}
      </div>
    </div>
  );
};

export default WinnerCard;
