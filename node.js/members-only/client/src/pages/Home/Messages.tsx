import { useMessages } from "../../utils/useMessages";
import Message from "./Message";

export default function Messages() {
  const { messages } = useMessages();
  return (
    <div className="flex flex-col px-2 gap-1">
      {messages.map((message, index) => (
        <div className={index % 2 ? "bg-slate-50" : "bg-white"} key={index}>
          <Message  message={message} />
        </div>
      ))}
    </div>
  );
}
