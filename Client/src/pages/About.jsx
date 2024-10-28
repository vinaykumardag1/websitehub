import React from 'react'
import Navbar from '../Navbar'

import about_img1 from '../assets/images/about_image.webp'
const About = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto">
        <div className='grid grid-cols-2 py-10'>
          <div className='text-xl'>
            <p>WebsiteHub is designed to be your go-to resource for discovering the internet's top websites across various categories. Our platform organizes the most popular and trusted websites from sectors like news, e-commerce, entertainment, social media, and technology, giving users easy access to high-quality online destinations. Each website listed is curated based on performance metrics like traffic, engagement, and overall reputation, ensuring that users receive a carefully selected overview of the best the web has to offer.</p>
            <p className='py-5'>Whether you're conducting market research, curating content, or just exploring industry trends, WebsiteHub simplifies the search for reliable information and quality sites, making it an invaluable tool for anyone navigating today’s digital landscape.</p>
          </div>
          <div className='flex justify-center'><img src={about_img1} alt='Image' className='w-2/3'/></div>
        </div>
      </div>
    </>
  )
}

export default About
