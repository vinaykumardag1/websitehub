import React from 'react'
import { Container } from '@mui/material'
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <Container>
    <div className=' py-10'>
      <ul className='flex w-full justify-center text-3xl items-center gap-9' type='none'>
        <li><a href="mailto:vinaykumardag1@gmail.com"><CiMail/></a></li>
        <li><a href="https://www.instagram.com/daggupati_vinay/" target='_blank'><FaInstagram/></a></li>
        <li><a href="https://x.com/vinay_daggupati"><FaXTwitter/></a></li>
        <li><a href="https://www.linkedin.com/in/vinay-kumar-daggupati-b3141224b/"><CiLinkedin/></a></li>
        <li><a href="https://github.com/vinaykumardag1"><FaGithub/></a></li>
      </ul>
     </div>
    </Container>
  )
}

export default Footer
