import React from 'react'
import ReactDOM from 'react-dom/client'
import { Background } from './components/Background'
import { App } from './App'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Background>
          <App />
        </Background>
  </React.StrictMode>,
)
