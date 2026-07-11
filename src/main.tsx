import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@salutejs/plasma-tokens/themes/plasma_b2c__light.js'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
