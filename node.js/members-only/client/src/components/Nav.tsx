import React, { useContext } from "react";
import logo from "../../public/logo.svg";
import { ModalContext, ModalContextType } from "../context/ModalContext";
import { Link } from "react-router-dom";

export default function Nav() {
  const context = useContext(ModalContext) as ModalContextType;
  const { isLoginModalOpen, setIsLoginModalOpen } = context;
  return (
    <nav className="flex h-16 py-1 border-gray-200 border-b-2">
      <Link to="/" className="flex">
      <img src={logo} alt="MembersOnly Logo" className="invert" />
      </Link>
      <button className="bg-indigo-700 px-4 rounded-md text-white text-md font-semibold"
      onClick={()=>setIsLoginModalOpen(!isLoginModalOpen)}>Log In</button>
     
    </nav>
  );
}
