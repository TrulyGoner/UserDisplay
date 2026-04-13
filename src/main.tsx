import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyColors } from './shared/constants/colors'
import './app/styles/index.css'
import App from './app/App'

applyColors()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
