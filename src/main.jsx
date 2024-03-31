import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/ThemeContext'
import { Background } from './components/Background'
import { App } from './App'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
        <Background>
          <App />
        </Background>
    </ThemeProvider>
  </React.StrictMode>,
)
