import React, { useContext, useState } from "react";
import logo from "../../public/logo.svg";
import {
  ModalContext,
  ModalContextType,
  useModalContext,
} from "../context/ModalContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import baseavatar from "../assets/baseavatar.svg";
import RoundedButton from "./RoundedButton";

export default function Nav() {
  const { isAuthenticated, userData, logout } = useAuth();
  const { isLoginModalOpen, setIsLoginModalOpen } = useModalContext();
  const [showUserInfo, setShowUserInfo] = useState(false)
  console.log(userData);
  return (
    <nav className="flex h-16 py-1 px-4 justify-between border-gray-200 border-b-2 ">
      <Link to="/" className="flex">
        <img src={logo} alt="MembersOnly Logo" className="invert" />
      </Link>
      {isAuthenticated ? (
        <button className="rounded-full"
        onClick={()=>setShowUserInfo(!showUserInfo)}>
        <img
          src={userData?.isPro ? userData?.avatar : baseavatar}
          alt="userAvatar"
          className="h-full"
        /></button>
       
      ) : (
        <button
          className="bg-indigo-700 px-4 rounded-md text-white text-md font-semibold"
          onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
        >
          Log In
        </button>
      )}
       {isAuthenticated && showUserInfo && (
          <div className="absolute flex flex-col gap-1 top-16 right-0 bg-slate-200 z-20 p-4 rounded-bl-xl">
            <RoundedButton text="Settings" />
            <RoundedButton text="Log Out" onClick={logout} />
          </div>
        )}
    </nav>
  );
}
