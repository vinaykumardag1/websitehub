import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Card from './Card'; 
import axios from 'axios';
import { Container } from '@mui/material';
import { API_URL,LOCAL_API_URL } from '../services/apis';
const Favorite = () => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || []; // Retrieve all IDs from local storage
      if (checkedItems.length > 0) {
        try {
          const promises = checkedItems.map((id) =>
            axios.get(`${LOCAL_API_URL}/productid/${id}`)
          );
          const responses = await Promise.all(promises); // Wait for all API calls to complete
          const data = responses.map((response) => response.data); // Extract data from each response
          setFav(data); // Set the combined data in the state
          console.log(data);
        } catch (error) {
          console.error('Error fetching favorite items:', error);
        }
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
    <Container>
      <Navbar />
      <div className="w-full grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
      {fav.length > 0 ? (
        fav.map((item, index) => <Card item={item} key={index} />)
      ) : (
        <p>No favorite items selected.</p>
      )}
    </div>
    </Container>
    </>
  );
};

export default Favorite;
