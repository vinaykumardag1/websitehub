import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext


const Card = ({ item, index }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const [isChecked, setIsChecked] = useState(false);
  const [isUserExists, setIsUserExists] = useState(false); // State to track user existence

  // Check if userId exists in local storage
  useEffect(() => {
    const user = localStorage.getItem('userId');
    setIsUserExists(user); // Set to true if user exists, false otherwise
  }, []);

  // Load initial state from local storage
  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('checkedItems')) || [];
    setIsChecked(storedState.includes(item._id));
  }, [item._id]);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    const user = localStorage.getItem('userId');
    
    if (!isAuthenticated || !user) {
      console.warn('User is not authenticated or logged in.');
      return; // Prevent further action if the user is not authenticated
    }

    const storedState = JSON.parse(localStorage.getItem('checkedItems')) || [];
    let updatedState;

    if (isChecked) {
      // Remove the ID if unchecked
      updatedState = storedState.filter((id) => id !== item._id);
    } else {
      // Add the ID if checked
      updatedState = [...storedState, item._id];
    }

    // Update local storage
    localStorage.setItem('checkedItems', JSON.stringify(updatedState));
    setIsChecked(!isChecked);

  };

  return (
    <div>
      <ul
        className="bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-4 ease-linear duration-200 hover:scale-[110%] p-5 border-sky-100 rounded-2xl"
        key={index}
      >
        <li className="text-3xl text-[#fc7f3f] py-3 flex justify-between">
          {item.name}
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={!isAuthenticated || !isUserExists} // Disable if user isn't authenticated or doesn't exist
            title='Add to favourite'
          />
        </li>
        <li className='text-[#ffff83]'>{item.category}</li>
        <li className="py-3 text-[#ffffff]">{item.desc}</li>
        <a href={`${item.url}`} target="_blank" title='website links' rel="noopener noreferrer">
          <li className="py-3 text-[#78fdff] text-2xl">Visit webiste</li>
        </a>
      
      </ul>
    </div>
  );
};

export default Card;
