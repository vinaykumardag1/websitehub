import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Components/Footer'
import about_img1 from '../assets/images/about_image.webp'

const About = () => {
  return (
    <>
      <Navbar/>
      <Container>
        <div className='px-6 flex  gap-5 flex-col-reverse  md:flex-row py-10'>
          <div className='text-sm md:text-xl flex items-center '>
            <div>
            <p>WebsiteHub is designed to be your go-to resource for discovering the internet's top websites across various categories. Our platform organizes the most popular and trusted websites from sectors like news, e-commerce, entertainment, social media, and technology, giving users easy access to high-quality online destinations. Each website listed is curated based on performance metrics like traffic, engagement, and overall reputation, ensuring that users receive a carefully selected overview of the best the web has to offer.</p>
            <p className='py-5'>Whether you're conducting market research, curating content, or just exploring industry trends, WebsiteHub simplifies the search for reliable information and quality sites, making it an invaluable tool for anyone navigating today’s digital landscape.</p>
            </div>
          </div>
          <img src={about_img1} alt='Image' className='md:w-1/3'/>
        </div>
      </Container>
      <Footer/>
    </>
    
   )
}

export default About
