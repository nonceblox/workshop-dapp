import { Player } from "@/type";
import { abi } from "@/utils/abi";
import { useReadContract } from "wagmi";




  interface ListProps {
    items: Player[];
  }
  
const  PlayerList: React.FC<ListProps> = ({ items }) => {

   

    
    return (
        <div className="p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">List of players</h1>
        <ul className="list-none pl-5 space-y-2">
          {items?.map((item, index) => (
            <li key={index} className="p-2 bg-white rounded shadow">
            
              <span className="text-gray-600">address: {item.player}</span>
              <br/>
              <span className="text-gray-600">guessNumber: {item.gusssedNumber}</span>
            

            </li>
          ))}
        </ul>
      </div>
    )
}

export default PlayerList