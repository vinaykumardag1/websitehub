import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Card from './Card';
import axios from 'axios';
import { Container } from '@mui/material';
import { API_URL } from '../services/apis';

const Favorite = () => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        console.warn('No user ID found in localStorage');
        return;
      }

      try {
        // ✅ Fetch user data from backend
        const { data: userData } = await axios.get(`${API_URL}/userdetails/${userId}`);

        const checkedItems = userData.favorites;

        if (Array.isArray(checkedItems) && checkedItems.length > 0) {
          // ✅ Fetch each favorite product
          const promises = checkedItems.map((id) =>
            axios.get(`${API_URL}/productid/${id}`)
          );

          const responses = await Promise.all(promises);
          const data = responses.map((response) => response.data);
          setFav(data);
        }
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Container>
        <Navbar />
        <div className="w-full grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 my-6">
          {fav.length > 0 ? (
            fav.map((item, index) => <Card item={item} key={index} />)
          ) : (
            <p className="text-white text-lg">No favorite items selected.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default Favorite;
