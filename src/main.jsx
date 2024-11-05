import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import BroRouter from './BroRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BroRouter />
  </StrictMode>,
)
