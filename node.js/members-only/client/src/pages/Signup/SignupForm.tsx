import axios from "axios";
import React, { MouseEvent, useState } from "react";
import SubmitButton from "../../components/SubmitButton";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {
  const {register}=useAuth()
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();
    const { userName, firstName, lastName, email, password } = formData;
    setErrorMessage(undefined)
    setMessage(undefined)
    try {
      const response = await register( userName, firstName, lastName, email, password );
      if(response){
        setMessage(response.message);
        console.log(response)
        
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        
        setErrorMessage(error.response?.data.message);
        console.log('error',error.response?.data)
      }
    }
    
    
  };

  return (
      <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="text-sm text-gray-700 block mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Username"
            value={formData.userName}
            name = "userName"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="firstName"
            className="text-sm text-gray-700 block mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name = 'firstName'
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="text-sm text-gray-700 block mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name= 'lastName'
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-sm text-gray-700 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name = 'email'
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="text-sm text-gray-700 block mb-2">
            Password
          </label>
          <input
            type="password"
            name = 'password'
            id="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {errorMessage && (
              <div className="mb-4 text-green-500 text-center">{errorMessage}</div>
            )}
        {message && (
              <div className="mb-4 text-red-500 text-center">{message}</div>
            )}
        <SubmitButton text= 'Sign Up '/>
       
      </form>
    
  );
};

export default SignupForm;
