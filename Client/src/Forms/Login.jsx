import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL } from '../services/apis';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Form submit handler
  const formSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });
  
      console.log(response.data); // Log the response data to check if token is included
  
      if (response.data.message) {
        toast.success(response.data.message);  // Display success message
  
        if (response.data.token) {  // Ensure 'token' is in the response
          localStorage.setItem("authToken", response.data.token);  // Store the token in localStorage
        }
  
        if (response.data.id) {
          localStorage.setItem("userId", response.data.id);  // Optionally store the user ID in localStorage
        }
  
        navigate("/");  // Redirect to home page or another route after login
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.warning(err.response.data.message);  // Show error message from server
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  

  // Styles for the form elements
  const formStyles = {
    label: "block text-sm font-medium text-gray-900",
    input: "block w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm",
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='shadow-2xl p-12'>
        <p className='mb-8 text-center text-3xl'>Login Form</p>
        <form onSubmit={formSubmit}>
          <label htmlFor="email" className={formStyles.label}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={formStyles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className={formStyles.label}>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={formStyles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type='submit'
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
          <p >if your not <Link to='/register' className="text-blue-600">Registered?</Link></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
