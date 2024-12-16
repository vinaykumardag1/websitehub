import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext


const Card = ({ item, index }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const { isAuthenticated } = useAuth(); // Get authentication status from context
  const [isChecked, setIsChecked] = useState(false);

  // Load initial state from local storage
  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('checkedItems')) || [];
    setIsChecked(storedState.includes(item._id));
  }, [item._id]);

  // Handle checkbox change
  const handleCheckboxChange = () => {
    if (!isAuthenticated) {
      alert('Please log in to select your favorites.');
      return;
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
    // let user=localStorage.getItem('userId')
    // if(user){
    //    setIsChecked(isChecked);
    // }else{
    //    setIsChecked(!isChecked);
    // }
  };

  return (
    <div>
      <ul
        className="border-4 ease-linear duration-200 hover:scale-[110%] p-5 border-sky-100 rounded-2xl"
        key={index}
      >
        <li className="text-3xl py-3 flex justify-between">
          {item.name}
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={!isAuthenticated} // Disable checkbox if user is not authenticated
            title='Add to favourite'
          />
        </li>
        <a href={`${item.url}`} target="_blank" rel="noopener noreferrer">
          <li className="py-3 text-blue-400">{item.name}</li>
        </a>
        <li className="py-3">{item.desc}</li>
      
      </ul>
    </div>
  );
};

export default Card;
