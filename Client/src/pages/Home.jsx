import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'
import { webhubapi } from '../services/apis';

const Home = () => {
  const [webhub, setWebhub] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const productsData = await webhubapi();
      setWebhub(productsData);  
      console.log(productsData);
    };
    getData();
  }, []);

  return (
    <>
    <Navbar/>
    <div>
      {webhub.length > 0 ? (
        webhub.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>
            <a href={item.url}>
              <li>{item.name}.com</li>
            </a>
            <li>{item.desc}</li>
            
          </ul>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default Home;
