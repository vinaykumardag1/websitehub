import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Card from './Card';
import axios from 'axios';
import { Container } from '@mui/material';
import { API_URL } from '../services/apis';
import Loading from './Loading';

const Favorite = () => {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('userId'); 
      if (!userId) {
        console.warn('No user ID found in localStorage');
        setLoading(false); // Stop loading if no user ID
        return;
      }

      try {
        
        const { data: userData } = await axios.get(`${API_URL}/userdetails/${userId}`);

        const checkedItems = userData.favorites;

        if (Array.isArray(checkedItems) && checkedItems.length > 0) {
          
          const promises = checkedItems.map((id) =>
            axios.get(`${API_URL}/productid/${id}`)
          );

          const responses = await Promise.all(promises);
          const data = responses.map((response) => response.data);
          setFav(data);
        }
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Container>
        <Navbar />
        {loading ? (
          <Loading /> 
        ) : (
          <div className="w-full grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 my-6">
            {fav.length > 0 ? (
              fav.map((item, index) => <Card item={item} key={index} />)
            ) : (
              <p className="text-white text-lg">No favorite items selected.</p>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Favorite;
