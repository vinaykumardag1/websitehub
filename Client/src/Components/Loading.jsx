import React from 'react'

import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import { Container } from '@mui/material';
const Loading = () => {
  const list=[
    {
    website:"website",
    link:"webiste",
    desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
    },
    {
      website:"website",
      link:"webiste",
      desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
    },
    {
      website:"website",
      link:"webiste",
      desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
    },
    {
      website:"website",
      link:"webiste",
      desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
    },
    {
      website:"website",
      link:"webiste",
      desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
      },
      {
        website:"website",
        link:"webiste",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
      },
      {
        website:"website",
        link:"webiste",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
      },
      {
        website:"website",
        link:"webiste",
        desc:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum delectus sint dignissimos fugit laborum porro, repellendus necessitatibus aliquid, ex numquam quam modi fugiat consequuntur, error assumenda et iure facere iusto!"
      }

  ]
  return (
    <>
    <Container>
     <div className='flex flex-wrap justify-center items-center gap-5 w-full '>
       
    
    {list.map((item)=>(
    <Card variant="outlined" sx={{ width: 243, display: 'flex', gap: 2 }}>
      <Typography >
      <Skeleton variant="overlay">
       <h1 className="my-8">{item.website}</h1>
      </Skeleton>
      </Typography>
      <Typography className="my-8">
      <Skeleton variant="overlay">
       <a className="my-8">{item.link}</a>
      </Skeleton>
      </Typography>
    <Typography className="my-8">
  
      <Skeleton>
        <p className="my-8">{item.desc}</p>
      </Skeleton>
    </Typography>
  </Card>
  ))}
  </div>
  </Container>
  </>
    
  )
}

export default Loading
