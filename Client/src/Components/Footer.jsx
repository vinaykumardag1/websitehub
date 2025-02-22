import React from 'react'
import { Container } from '@mui/material'
// import { CiMail } from "react-icons/ci";
// import { FaInstagram } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { CiLinkedin } from "react-icons/ci";
// import { FaGithub } from "react-icons/fa";
import x_icon from '../assets/x_icon.svg'
import linkedin_icon from '../assets/linkedin_icon.svg'
import github_icon from '../assets/github_icon.gif'
import instagram_icon from '../assets/instagram_icon.svg'
import mail_icon from '../assets/mail_icon.svg'
const Footer = () => {
  return (
    <Container>
    <div className=' py-10'>
      <ul className='flex w-full justify-center text-3xl items-center gap-9' type='none'>
        <li><a href="mailto:vinaykumardag1@gmail.com" title="mail "><img src={mail_icon} alt="" /></a></li>
        <li><a href="https://www.instagram.com/daggupati_vinay/" title="Instagram " target='_blank'><img src={instagram_icon} alt="" /></a></li>
        <li><a href="https://x.com/vinay_daggupati" title="Twitter"><img src={x_icon} alt="" /></a></li>
        <li><a href="https://www.linkedin.com/in/vinay-kumar-daggupati-b3141224b/" title="Linked In"><img src={linkedin_icon} alt="" /></a></li>
        <li><a href="https://github.com/vinaykumardag1" title="github "><img src={github_icon} className='rounded-full'/></a></li>
      </ul>
     </div>
     <p className='text-center my-4'>© 2024 Daggupati Vinay. All rights reserved.</p>
    </Container>
  )
}

export default Footer
