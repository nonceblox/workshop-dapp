import { getEthersSigner } from '@/ethersConnect';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import guess from "@/utils/guess.json";
import { parseUnits } from 'viem';

interface GuessFormProps {
  disable: boolean;
}

const GuessForm: React.FC<GuessFormProps> = ({ disable }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGuessNumber = async () => {
    try {
      const guessNumber = parseInt(inputValue, 10);
      if (!isNaN(guessNumber)) {
        const provider = await getEthersSigner();

        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT as `0xstring`,
          guess,
          provider
        );

        const tx = await contract.guessTheNumber(BigInt(guessNumber), {
          value: parseUnits("0.0001", 18),
        });

        await tx.wait();
        console.log(tx);
        alert("Guess submitted successfully!");
        window.location.reload();
      } else {
        alert('Please enter a valid number');
      }
    } catch (error) {
      console.error("Error submitting guess:", error);
      alert("Failed to submit guess. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded mr-2"
        placeholder="Enter your guess"
        disabled={disable}
      />
      <button
        onClick={handleGuessNumber}
        className="p-2 bg-blue-500 text-white rounded"
        disabled={disable}
      >
        Guess
      </button>
    </div>
  );
};

export default GuessForm;
