import React, { useState, useEffect } from 'react';
import Card from './Card';
import { webhubapi } from '../services/apis';
import Loading from './Loading';

const Home_data = () => {
  const [webhub, setWebhub] = useState([]);
  

  useEffect(() => {
    const getData = async () => {
      const productsData = await webhubapi();
      setWebhub(productsData);  
    };
    getData();
  }, []);
  if (!webhub) {
    return <p>No data availbale now</p>
  }

  return (
    <div>
      <div className='w-full grid gap-9 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
        {webhub.length > 0 ? (
          webhub.map((item, index) => (
            <Card item={item} index={index} />
          ))
        ) : (
          <Loading/>
        )}
      </div>
    </div>
  );
}

export default Home_data;
