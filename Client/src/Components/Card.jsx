import React from 'react';

const Card = ({ item,index }) => {
  return (
    <div>
      <ul className='border-4 ease-linear duration-200 hover:scale-[110%] p-5 border-sky-100 rounded-2xl' key={index}>
        <li className='text-3xl py-3' key={index}>{item.name}</li>
        <a href={`${item.url}`}  >
          <li className='py-3 text-blue-400' title={item.url}>{item.name}</li>
        </a>
        <li className='py-3'>{item.desc}</li>
      </ul>
    </div>
  );
}

export default Card;
