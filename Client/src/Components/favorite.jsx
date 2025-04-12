import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Card from './Card';
import axios from 'axios';
import { Container } from '@mui/material';
import { API_URL } from '../services/apis';
import Loading from './Loading';

const Favorite = () => {
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      // Step 1: Get userId from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.warn('No user ID found in localStorage');
        setLoading(false);
        return;
      }

      try {
        // Step 2: Fetch user data using userId
        const { data: userData } = await axios.get(`${API_URL}/userdetails/${userId}`);

        // Step 3: Get the favorites array from userData
        const favoriteIds = userData?.favorites;

        if (Array.isArray(favoriteIds) && favoriteIds.length > 0) {
          // Step 4: Fetch each favorite product safely
          const productRequests = await Promise.all(
            favoriteIds.map(async (id) => {
              try {
                const res = await axios.get(`${API_URL}/productid/${id}`);
                return res.data;
              } catch (err) {
                console.warn(`Product with ID ${id} not found`);
                return null;
              }
            })
          );

          // Step 5: Filter out failed fetches
          const validProducts = productRequests.filter((item) => item !== null);

          // Step 6: Store them in state
          setFav(validProducts);
        } else {
          console.info('No favorites found for this user.');
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
  );
};

export default Favorite;
