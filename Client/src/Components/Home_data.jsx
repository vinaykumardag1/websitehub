import React, { useState, useEffect } from 'react';
import Card from './Card';
import { webhubapi } from '../services/apis';
import Loading from './Loading';
import { Container } from '@mui/material';
import ScrollToTop from './ToptoScroll';
import noresults from '../assets/images/idonthaveit.gif'

const Home_data = () => {
  const [webhub, setWebhub] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const productsData = await webhubapi();
      setWebhub(productsData);
      setFilteredData(productsData); // Set filtered data initially to full data
      setLoading(false);
    };
    getData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on the search query
    const filtered = webhub.filter((item) =>
      item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
     
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <Loading />;
  }



  return (
    <>
      <Container className="py-10">
        <div className="flex justify-center gap-1 my-11">
          <input
            type="search"
            placeholder="Search"
            className="w-1/2 px-2 py-3 rounded-2xl border-black border-4"
            value={searchQuery}
            onChange={handleSearch} 
          />
         
        </div>
        <div className="w-full grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => <Card key={index} item={item} />)
          ) : (
           <img src={noresults} alt='no results available' />
          )}
        </div>
      </Container>
      <ScrollToTop />
    </>
  );
};

export default Home_data;
