import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Product from './Components/product'
import Register from './Forms/Register'
import Login from './Forms/Login'
import Favorite from './Components/favorite'
import { Routes,Route } from 'react-router-dom'



const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>
      
    
    </div>
  )
}

export default App
