import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { CheckedItemsProvider } from './context/context.jsx';
import {AuthProvider} from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
     <CheckedItemsProvider>
      <App/>
      </CheckedItemsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
