
import { IoMdClose } from "react-icons/io";
export default function ExitButton({onClick}:{onClick: ()=>void}) {
    return (
      <button 
      onClick={onClick}
      className="hover:bg-indigo-950 text-3xl absolute top-[-1rem] right-[-1rem] top text-white font-extrabold bg-indigo-800 p-1 rounded-full">
        <IoMdClose />
      </button>
    );
  }