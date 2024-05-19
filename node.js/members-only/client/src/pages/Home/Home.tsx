import SubmitButton from "../../components/RoundedButton";
import Layout from "../../components/layout/layout";
import Messages from "./Messages";

import { useAuth } from "../../context/AuthContext";
import { ReactEventHandler, useState } from "react";
import axios from "axios";

function NewMessage({}) {
  const [message, setMessage] = useState("");
  const {newMessage} = useAuth()
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }
  async function handleClick(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    try {
      const response = await newMessage(message);
      if (response) {      
      }
    } catch (error) {
      console.error("Log in error:", error);
      if (axios.isAxiosError(error)) {
      }
    }
    
  }

  return (
    <section className="w-full flex justify-center">
      <div className=" flex flex-col justify-center mt-6 w-1/2 rounded-2xl bg-slate-100 focus-within:border-black border-2  border-transparent  p-2">
        <textarea
          value={message}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 mb-1 bg-transparent resize-none outline-none"
          name="newmessage"
          id="newmessage"
          placeholder="I wholeheartedly hate this club"
        ></textarea>
        <div className="w-full flex justify-end">
          <button
            className="bg-indigo-700 px-4 py-2 rounded-md text-white text-md font-semibold right-2"
            onClick={handleClick}
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Messages />
      {isAuthenticated ? <NewMessage /> : null}
    </Layout>
  );
}
