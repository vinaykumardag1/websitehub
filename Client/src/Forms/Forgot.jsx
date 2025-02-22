import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL, LOCAL_API_URL } from '../services/apis';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [con_pass,setCon_pass]=useState("");
  const [new_pass,setNew_pass]=useState("");
  const [otp,setOtp]=useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
        if(con_pass!==new_pass){
            toast.warning("passwords are not matched")
            setLoading(false);
            return;
        }
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email: email,
        new_password: new_pass,
        otp:otp,
      });
  
      // console.log(response.data); // Log the response data to check if token is included
  
      if (response.data.message) {
        toast.success(response.data.message);  
  
        setLoading(false);
        navigate("/login");  
      }
    } catch (err) {
      console.error("error in login",err)
      if (err.response && err.response.data && err.response.data.message) {
        toast.warning(err.response.data.message); 
      }else{
         toast.error("An unexpected error occurred");
         console.log(err)
      }
      setLoading(false);
    }
  };
  
  const formStyles = {
    label: "block text-sm font-medium text-white",
    input: "block w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm",
  };

  return (
    <div className='flex text-white justify-center items-center h-screen'>
      <div className='bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-12'>
        <p className='mb-8 text-center text-3xl'>Reset Password</p>
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
          <label htmlFor="new_password" className={formStyles.label}>Password</label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            className={formStyles.input}
            value={new_pass}
            onChange={(e) => setNew_pass(e.target.value)}
            required
          />
          <label htmlFor="password" className={formStyles.label}>confirm Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={formStyles.input}
            value={con_pass}
            onChange={(e) => setCon_pass(e.target.value)}
            required
          />
          <label htmlFor="otp" className={formStyles.label}>Enter OTP</label>
          <input type="text" name='otp'
            className={formStyles.input} id='otp'
             placeholder='Enter otp'
             onChange={(e)=>setOtp(e.target.value)}
              required/>
          <button
            type='submit'
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Forgot;

