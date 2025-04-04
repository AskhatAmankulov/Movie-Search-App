import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Movie Search App/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
