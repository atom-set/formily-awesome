import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './pages/V1/form-demo/index'
import AntdForm from './pages/V1/antd-demo/index'
import Formily from './pages/V1/formily-demo/index'
import FormItem from './pages/V2/index'
import './index.less'
import { Button, Card, Tabs } from 'antd'
import stores from './store'
import { Provider } from 'mobx-react'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider {...stores}>
    <React.StrictMode>
      <Card style={{ width: "660px" }}>
        <Tabs defaultActiveKey='4'>
          <Tabs.TabPane tab="原生form实现" key="1">
            <Form />
          </Tabs.TabPane>
          <Tabs.TabPane tab="antd实现" key="2">
            <AntdForm />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="formily实现" key="3">
            <Formily />
          </Tabs.TabPane> */}
          <Tabs.TabPane tab="自定义FormItem" key="4">
            <FormItem />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </React.StrictMode>
  </Provider>,
)
