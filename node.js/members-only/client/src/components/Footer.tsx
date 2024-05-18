import { AiFillGithub } from "react-icons/ai";
export default function Footer() {
  return (
    <footer className="flex h-16 bottom-0 justify-center w-full items-center gap-1 shadow-slate-200 shadow-inner">
      <span>Made by</span>
      <a
        href="https://github.com/SirGram"
        target="_blank"
        className="inline-flex items-center justify-end"
      >        
       <span> <b >SirGram</b></span>{" "}<AiFillGithub className="ml-1 text-2xl" />
      </a>
    </footer>
  );
}
