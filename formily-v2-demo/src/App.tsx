import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout";
import Home from './pages/Home';
import About from './pages/About';
// 联动
import NormalLinkage from './pages/01.FormLinkage/NormalForm/index';
import AntLinkage from './pages/01.FormLinkage/AntForm';
import FormilyLinkage from './pages/01.FormLinkage/FormilyForm';

// 用户登陆注册
import UserLoginV1 from './pages/02.UserLogin/V1';
import UserLoginV2 from './pages/02.UserLogin/V2';
import UserLoginV3 from './pages/02.UserLogin/V3';


// antd源码系统
import AntdV1 from './pages/20.Antd/V1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<About />} />
          {/* --- 原生方式实现联动 --- */}
          <Route path="normalLinkage" element={<NormalLinkage />} />
          {/* antd 方式实现联动 */}
          <Route path="antLinkage" element={<AntLinkage />} />
          {/* formily 方式实现联动 */}
          <Route path="formilyLinkage" element={<FormilyLinkage />} />
          
          {/* 用户登陆注册 */}
          <Route path="userLogin/v1" element={<UserLoginV1 />} />
          <Route path="userLogin/v2" element={<UserLoginV2 />} />
          <Route path="userLogin/v3" element={<UserLoginV3 />} />

          {/* ant design 系列*/}
          <Route path="antd/v1" element={<AntdV1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
