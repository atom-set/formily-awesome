import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/form-demo/antdForm'
import './index.css'
import { Card } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Card style={{ width: "660px", padding: "20px" }}>
      <App />
    </Card>
  </React.StrictMode>,
)
