import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.scss';
import './styles/normolize.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
