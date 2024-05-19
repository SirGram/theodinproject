import React, { useContext, useState } from "react";
import { ModalContext, ModalContextType } from "../../context/ModalContext";
import { Link } from "react-router-dom";
import SubmitButton from "../RoundedButton";

export default function NewMessageModal() {
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const context = useContext(ModalContext) as ModalContextType;
  const { isLoginModalOpen, setIsLoginModalOpen } = context;
  console.log(isLoginModalOpen);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
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
                placeholder="This website sucks"
                name="content"
                type="content"
                id="content"
                value={formData.content}
                onChange={(e) => handleChange(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
           

            <SubmitButton text="Send Message" />
          </form>
         
        </div>
      </div>
    </>
  );
}
