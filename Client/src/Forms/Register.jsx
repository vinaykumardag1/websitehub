import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link,useNavigate} from 'react-router-dom'
import { API_URL } from '../services/apis';
import pdf from '../assets/WebsiteHub_Terms_and_Conditions.pdf'

const Register = () => {
  // Individual useState hooks for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate=useNavigate()



  // Form submit handler
  const formSubmit = async (e) => {
    e.preventDefault();
  
    // Check for password mismatch
    if (password !== cPassword) {
      toast.warning("Password and confirm password do not match");
      return;
    }
 
  
  
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name:name,
        email:email,
        password:password,
      });
      
      // console.log(response.data); // Check the response
  
      if (response.data.message) {
        toast.success(response.data.message);
          navigate("/login")        
      }
    } catch (err) {
      console.error("Error submitting data:", err);
  
      // Check for a response message in the error
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Show server error message
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Styles for the form elements
  const formStyles = {
    label: "block text-sm font-medium text-white",
    input: "block w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm",
  };

  return (
    <div className='flex justify-center text-white items-center h-screen'>
      <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-12 w-full sm:w-[80%] md:w-[50%] lg:w-1/3'>
        <p className='mb-8 text-center text-white text-3xl'>Register Form</p>
        <form onSubmit={formSubmit}>
          <label htmlFor="name" className={formStyles.label}>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className={formStyles.input}
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
          <label htmlFor="email" className={formStyles.label}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={formStyles.input}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className={formStyles.label}>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={formStyles.input}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <label htmlFor="cpassword" className={formStyles.label}>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            className={formStyles.input}
            value={cPassword}
            onChange={(e)=>setCPassword(e.target.value)}
            required/>
            <input type="checkbox" id='checkbox' name='checkbox' className="m-2" required/>
             <a htmlFor="checkbox" href={pdf} target='_blank' className='text-blue-900'>Terms&Conditions</a> <br />
          <button
            type='submit'
            className="rounded-md my-2 bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
          <p>Already Registerd please <Link to='/login' className='text-blue-500'>Login</Link>?</p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
