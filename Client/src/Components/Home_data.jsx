import React, { useState, useEffect } from 'react';
import Card from './Card';
import { webhubapi } from '../services/apis';
import Loading_gif from '../assets/images/Skateboarding.gif';

const Home_data = () => {
  const [webhub, setWebhub] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const productsData = await webhubapi();
      setWebhub(productsData);  
    };
    getData();
  }, []);

  return (
    <div>
      <div className='w-full grid gap-9 grid-cols-4'>
        {webhub.length > 0 ? (
          webhub.map((item, index) => (
            <Card item={item} key={index} />
          ))
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <img src={Loading_gif} alt="Loading" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home_data;
