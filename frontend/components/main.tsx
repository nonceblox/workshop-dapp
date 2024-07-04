"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useReadContract } from "wagmi";
import { abi } from "@/utils/abi";
import PlayerList from "./PlayerList";
import GuessForm from "./GuessForm";
import { Player } from "@/type";
import { getEthersSigner } from "@/ethersConnect";
import { ethers } from "ethers";
import guess from "@/utils/guess.json";
import WinnerCard from "./WinnerCard";
import { zeroAddress } from "viem";

export default function Main() {
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

  console.log(playerslist?.data, "getPlayers");

  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(playerslist.data as Player[]);
    console.log(playerslist.data, "playersList");
  }, [playerslist]);

  const result = useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
    functionName: "start",
  });

  useEffect(() => {
    console.log(result?.data, "start");
  }, [result]);

  const handleStart = async () => {
    try {
      
      if ((result?.data == undefined || !result?.data)) {
        const provider = await getEthersSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
          guess,
          provider
        );

        const tx = await contract.gameStart();
        await tx.wait();

        console.log(tx);
        alert("Game started successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Failed to start the game. Please try again.");
    }
  };

  return result?.data ? (
    <div className="flex flex-wrap md:flex-nowrap gap-4">
      <GuessForm disable={playerslist?.data?.length === 2} />
      {playerslist?.data?.length === 2 && <WinnerCard />}
      <PlayerList items={players} />
    </div>
  ) : (
    <div>
      <Button color="primary" onClick={handleStart}>
        Start
      </Button>
    </div>
  );
}
