import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios';
import { toast } from 'react-toastify'; // No ToastContainer here
import { API_URL } from '../services/apis';

const Card = ({ item, index }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState(null);

  // Load userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Load initial favorite status
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${API_URL}/api/favorites/${userId}`);
          setIsChecked(response.data.includes(item._id));
        } catch (error) {
          console.error('Error fetching favorite items:', error);
        }
      }
    };

    fetchFavorites();
  }, [userId, item._id]);

  // Handle checkbox toggle
  const handleCheckboxChange = async () => {
    if (!userId) {
      console.warn('User ID not found in localStorage.');
      return;
    }

    try {
      if (isChecked) {
        await axios
          .post(`${API_URL}/favorite/remove`, {
            userId,
            itemId: item._id,
          })
          .then((response) => {
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.warning(error.response?.data?.message || 'Something went wrong');
          });
      } else {
        await axios
          .post(`${API_URL}/favorite/add`, {
            userId,
            itemId: item._id,
          })
          .then((response) => {
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.warning(error.response?.data?.message || 'Something went wrong');
          });
      }

      setIsChecked(!isChecked);
    } catch (error) {
      console.error('Error updating favorite items:', error);
    }
  };

  return (
    <div>
      <ul
        className="bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg border-4 p-5 border-sky-100 rounded-2xl"
        key={index}
      >
        <li className="text-3xl text-[#fc7f3f] py-3 flex justify-between">
          {item.name}
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: '#2196f3' }} />}
            checked={isChecked}
            onChange={handleCheckboxChange}
            title="Add to favourite"
          />
        </li>
        <li className="text-[#ffff83]">{item.category}</li>
        <li className="py-3 text-[#ffffff]">{item.desc}</li>
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <li className="py-3 text-[#78fdff] text-2xl">Visit website</li>
        </a>
      </ul>
    </div>
  );
};

export default Card;
