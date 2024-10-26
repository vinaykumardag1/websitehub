import React from 'react'

import { Link } from 'react-router-dom'
import logo_icon from './assets/images/logo.svg'
const Navbar = () => {
  const style='ease duration-100 hover:text-blue-300 hover:border-b-2 hover:border-red-900'
  return (
    
   <div className='container mx-auto  py-5 justify-between items-center flex w-full flex-col md:flex-row'>
      
   <h1 className='flex items-center text-4xl font-bold'><a href="#"><img src={logo_icon} alt="logo icon" className='w-24 h-24 my-3 sm:my-0 rounded-full' /></a> WebSiteHub</h1>
    <ul type='none' className='flex gap-5'>
      <li className={style}>
       <Link to='/'>Home</Link> 
      </li>
      <li className={style}>
        <Link to='/product'>Categories</Link>
      </li>
      <li className={style}>
        <Link to='/about'>About</Link>
      </li>
     
    </ul>
    </div>
  )
}

export default Navbar
