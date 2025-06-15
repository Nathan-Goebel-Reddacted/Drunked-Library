import { StrictMode } from 'react'
import { LoadingProvider } from './services/Loading.tsx'
import { ToastContainer } from 'react-toastify'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
    <ToastContainer />
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </LoadingProvider>
  </StrictMode>,
)
