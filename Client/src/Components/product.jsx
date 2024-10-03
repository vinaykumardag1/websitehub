import React, { useEffect, useState } from 'react'
import { api_category } from '../services/apis'
import {useParams} from 'react-router-dom'

const product = () => {
  const {categories}=useParams()
  const [data,setData]=useState([])
  useEffect(()=>{
    const getData=async ()=>{
      const api_id=await api_category()
      setData(api_id)
    }
    getData()
  },[categories])
  
  return (
    <div>
      {data.map((item)=>{
        <div>
        <ul key={item.id}>
          <li>{item.name}</li>
        <a href={item.url}><li>{item.name}.com</li></a>
          <li>{item.desc}</li>
          <li>{item.category}</li>
        </ul>
        
        </div>
        
      })}
    </div>
  )
}

export default product
