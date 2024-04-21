import React, { useState } from "react";
import LoginForm from "../interfaces/LogInForm";


const Account: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here, e.g., calling an API
    window.alert("Form submitted with data: " + JSON.stringify(formData));

  };

  return (
    <section className="container mx-auto my-auto p-12 flex-1">
      <h1 className="text-center mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-700 w-full text-white py-2 px-4 rounded-sm hover:opacity-50 focus:outline-none focus:bg-blue-700"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Account;
