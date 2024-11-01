import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar'

import Home_data from '../Components/Home_data';
import Footer from '../Components/Footer';

const Home = () => {
  

  return (
    <>
    <Navbar/>   
    
     
     <Home_data/>
    
    <Footer/>
    </>
  );
};

export default Home;
