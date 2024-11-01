import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo_icon from './assets/images/logo.svg';
import { Container } from '@mui/material';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkStyle = 'ease duration-100 hover:text-blue-300 hover:border-b-2 hover:border-red-900';
  const navClick=()=>{
    setIsMobileMenuOpen(false)
  }

  return (
    <Container>
      <div className="top-0 py-5 flex items-center justify-between w-full">
        
        {/* Logo and Title */}
        <h1 className="flex items-center text-3xl font-bold">
          <a href="#">
            <img src={logo_icon} alt="logo icon" className="w-16 h-16 rounded-full mr-3" />
          </a> 
          WebSiteHub
        </h1>

        {/* Navbar Links for Desktop */}
        <ul className="hidden md:flex gap-5">
          <li className={linkStyle}>
            <Link to="/">Home</Link> 
          </li>
          <li className={linkStyle}>
            <Link to="/product">Categories</Link>
          </li>
          <li className={linkStyle}>
            <Link to="/about">About</Link>
          </li>
        </ul>

        
        <div className=" md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="flex flex-col items-center gap-4 md:hidden mt-4">
          <li className={linkStyle}>
            <Link to="/" onClick={navClick}>Home</Link> 
          </li>
          <li className={linkStyle}>
            <Link to="/product" onClick={navClick}>Categories</Link>
          </li>
          <li className={linkStyle}>
            <Link to="/about" onClick={navClick}>About</Link>
          </li>
        </ul>
      )}
    </Container>
  );
};

export default Navbar;
