import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/ThemeContext'
import { Background } from './components/Background'
import { App } from './App'
import './global.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Background>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Background>
    </ThemeProvider>
  </React.StrictMode>,
)
