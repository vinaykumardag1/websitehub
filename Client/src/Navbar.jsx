import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, IconButton, Menu, MenuItem, ListItemIcon, Fade } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';
import logo_icon from './assets/images/logo.svg';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {API_URL} from './services/apis'

import Badge from '@mui/material/Badge';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate()
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const { data } = await axios.get(`${API_URL}/userdetails/${userId}`);
          setUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUser(null);
    handleMenuClose();
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("checkedItems")
    navigate("/login");
  };
  const storedArray = JSON.parse(localStorage.getItem('checkedItems'));

  // Check if the array exists and get the length
  const arrayLength = storedArray ? storedArray.length : 0;
  
  const linkStyle = 'ease duration-100 hover:text-blue-300 hover:border-b-2 hover:border-red-900';

  const renderAuthButtons = () => (
    <div>
      <button className="px-4 py-2 mr-1 rounded-2xl bg-[#1099d3] text-white">
        <Link to="/login">Login</Link>
      </button>
      <button className="px-4 py-2 rounded-2xl bg-blue-800 text-white">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );

  const renderUserMenu = () => (
    <div className="flex gap-3 items-center">
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} TransitionComponent={Fade}>
        <MenuItem disabled>
          <p className="px-4 py-2 rounded-2xl bg-gray-200 text-black">Welcome, {user.name}!</p>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem >
       
        <Badge color="secondary" badgeContent={arrayLength}>
         <FavoriteBorder>
         </FavoriteBorder>
        </Badge>
         <Link to='/favorite' className='ml-3'>Favorite</Link>
        </MenuItem>
      </Menu>
    </div>
  );

  const renderLinks = () => (
    <ul className="flex items-center gap-5">
      <li className={linkStyle}><Link to="/">Home</Link></li>
      <li className={linkStyle}><Link to="/product">Categories</Link></li>
      <li className={linkStyle}><Link to="/about">About</Link></li>
      <li>{user && user ? renderUserMenu() : renderAuthButtons()}</li>
    </ul>
  );

  return (
    <Container>
      <div className="top-0 py-5 flex items-center justify-between w-full">
        <h1 className="flex items-center text-3xl font-bold">
          <a href="#">
            <img src={logo_icon} alt="logo icon" className="w-16 h-16 rounded-full mr-3" />
          </a>
          WebSiteHub
        </h1>

        <div className="hidden md:flex">{renderLinks()}</div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <ul className="flex flex-col items-center gap-4 md:hidden mt-4">
          {renderLinks()}
        </ul>
      )}
    </Container>
  );
};

export default Navbar;
