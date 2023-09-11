import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './pages/form-demo/index'
import AntdForm from './pages/antd-demo/index'
import Formily from './pages/formily-demo/index'
import './index.css'
import { Card, Tabs } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Card style={{ width: "660px" }}>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="原生form实现" key="1">
          <Form />
        </Tabs.TabPane>
        <Tabs.TabPane tab="antd实现" key="2">
          <AntdForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="formily实现" key="3">
          <Formily />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </React.StrictMode>,
)
