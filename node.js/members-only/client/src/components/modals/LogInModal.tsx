import React, { useContext, useState } from "react";
import { ModalContext, ModalContextType } from "../../context/ModalContext";
import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import ExitButton from "../ExitButton";
import { useAuth } from "../../context/AuthContext";

export default function LogInModal() {
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const {email, password} = formData
     const response = await login(email, password)
     console.log(response)
    } catch (error) {
      console.error("Log in error:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.msg);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const context = useContext(ModalContext) as ModalContextType;
  const { setIsLoginModalOpen } = context;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full relative">
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                placeholder="example@mail.com"
                name="email"
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                placeholder="mypassword"
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}

            <SubmitButton text="Sign In" />
          </form>
          <div className="bg-zinc-400 h-1 w-full mt-2"></div>
          <div className="mt-2 text-left flex gap-2 items-center">
          <h2 className="font-bold text-center">Don&apos;t have an account?</h2>

            <Link
              to="/signup"
              className="flex-1 mt-2"
              onClick={() => setIsLoginModalOpen(false)}
            >
              <SubmitButton text="Sign Up" />
            </Link>
          </div>
          <ExitButton onClick={()=>setIsLoginModalOpen(false)}/>
        </div>
      </div>
    </>
  );
}
