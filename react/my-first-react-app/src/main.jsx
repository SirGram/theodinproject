import React from 'react'
import ReactDOM from 'react-dom/client'
import {Greeting, Flags,Footer} from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Greeting />
    <Flags/>
    <Footer/>
  </React.StrictMode>,
)
