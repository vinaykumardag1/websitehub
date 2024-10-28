import React from 'react'
import Loading_gif from '../assets/images/Skateboarding.gif';
const Loading = () => {
  return (
    
    <div className='flex justify-center items-center w-full h-full'>
        <img src={Loading_gif} alt="Loading" />
    </div>
    
  )
}

export default Loading
