import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DE } from "enally.in-credit";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <p className='credit'> {DE} </p>
    </>

  </React.StrictMode>,
)
