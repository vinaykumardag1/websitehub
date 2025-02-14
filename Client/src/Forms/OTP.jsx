import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, LOCAL_API_URL } from '../services/apis';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/send-otp`, {
        email,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/reset-password');
      }
    } catch (err) {
      console.error("Error in OTP submission:", err);
      if (err.response?.data?.message) {
        toast.warning(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const formStyles = {
    label: "block text-sm font-medium text-white",
    input:
      "block w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm",
  };

  return (
    <>
      <div className="flex text-white justify-center items-center h-screen">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-12">
          <form onSubmit={formSubmit}>
            <label htmlFor="email" className={formStyles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              id="email"
              className={formStyles.input}
              required
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default OTP;
