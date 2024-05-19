import { useEffect, useState } from "react";
import { useMessages } from "../../utils/useMessages";
import Message from "./Message";

export default function Messages() {
  const { messages } = useMessages();
  const [openOptionsId, setOpenOptionsId] = useState<number | null>(null);

  const toggleOptions = (id: number) => {
    if (openOptionsId === id) {
      setOpenOptionsId(null);
    } else {
      setOpenOptionsId(id);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (openOptionsId !== null) {
      setOpenOptionsId(null);
      console.log("click")
    }
  };

  useEffect(() => {
    if (openOptionsId !== null) {
      
      
      document.addEventListener("click", handleClickOutside);
    } else {
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openOptionsId]);

  return (
    <div className="flex flex-col px-2 gap-1">
      {messages.map((message, index) => (
        <div className={index % 2 ? "bg-slate-50" : "bg-white"} key={index}>
          <Message  message={message} 
          isOpen={openOptionsId ===index}
            onToggle={() => toggleOptions(index)}/>
        </div>
      ))}
    </div>
  );
}
