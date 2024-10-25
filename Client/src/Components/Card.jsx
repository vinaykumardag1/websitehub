import React from 'react';

const Card = ({ item,index }) => {
  return (
    <div>
      <ul className='border-4 ease-linear duration-100 hover:scale-[110%] p-5 border-sky-100 rounded-2xl' key={index}>
        <li className='text-3xl py-3'>{item.name}</li>
        <a href={item.url} target='_blank' rel="noopener noreferrer">
          <li className='py-3 text-blue-400'>{item.name}.com</li>
        </a>
        <li className='py-3'>{item.desc}</li>
      </ul>
    </div>
  );
}

export default Card;
