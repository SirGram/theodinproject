import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-between items-center  relative w-full p-2 bg-black text-slate-50 ">
      <div className="ml-10">
        <span>&copy;2024 All rights reserved</span>
        <p>Project made using Marvel API</p>
      </div>
      <a
        href="https://github.com/SirGram"
        target="_blank"
        className="inline-flex items-center  mr-10"
      >
        <AiFillGithub className="text-2xl" />
        <span className="ml-1">SirGram</span>
      </a>
    </footer>
  );
}
