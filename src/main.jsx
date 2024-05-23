import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthGoogleProvider } from './context/authGoogle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGoogleProvider>
    <App />
    </AuthGoogleProvider>
  </React.StrictMode>,
)
