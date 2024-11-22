import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@adminkit/core/dist/js/app.js'
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  // <StrictMode>

    <App />
  // </StrictMode>,
)
