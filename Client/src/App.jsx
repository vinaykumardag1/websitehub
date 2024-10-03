import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Product from './Components/product'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/product/:category' element={<Product/>}/>
      </Routes>
    </div>
  )
}

export default App
