import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
// import Home from "./pages/Home"

// import NormalForm from './pages/01.FormLinkage/NormalForm/index';
// import AntForm from './pages/01.FormLinkage/AntForm';
// import FormilyForm from './pages/01.FormLinkage/FormilyForm';

// import NormalFormCore from './pages/02.CoreForm/Normal/index';
import UFormCore from './pages/02.CoreForm/UForm/index';
// import FormilyCore from './pages/02.CoreForm/Formily/index';

// import FormilyReactive from './pages/03.Reactive/Formily/index';
// import HookObserver from './pages/03.Reactive/HookObserver';

// import FormilyDemo from './pages/04.FormilyDemo/index';

import ReactForm from './pages/05.ReactFrom/index';

import UserLogin from './pages/06.UserLogin/index';
import UserLoginCore from './pages/07.UserLogin@core/index';
import UserLoginReact from './pages/08.UserLogin@react/index';
import UserLoginReactive from './pages/09.UserLogin@reactive/index';


import Final from './pages/10.Final/index';

// import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Layout />} > */}
          {/* <Route path="/" element={<Home />} /> */}

          {/* --- 原生方式实现联动 --- */}
          {/* <Route path="normalForm" element={<NormalForm />} /> */}
          {/* antd 方式实现联动 */}
          {/* <Route path="antForm" element={<AntForm />} /> */}
          {/* formily 方式实现联动 */}
          {/* <Route path="formilyForm" element={<FormilyForm />} /> */}
          {/* --- 原生方式实现联动 --- */}

          {/* --- @formily/core 的理解 ---  */}
          {/* <Route path="normalFormCore" element={<NormalFormCore />} /> */}
          <Route path="uFormCore" element={<UFormCore />} />
          {/* <Route path="formilyCore" element={<FormilyCore />} /> */}
          {/* --- @formily/core 的理解 ---  */}

          {/* --- Reactive --- */}
          {/* <Route path="hookObserver" element={<HookObserver />} />
          <Route path="formilyReactive" element={<FormilyReactive />} /> */}
          {/* --- Reactive --- */}

          {/* --- React Form 核心概念 --- */}
          <Route path="reactForm" element={<ReactForm />} />
          {/* --- React Form 核心概念 --- */}

          {/* --- formily 核心概念 --- */}
          {/* <Route path="formilyDemo" element={<FormilyDemo />} /> */}
          {/* --- React Form 核心概念 --- */}

          {/* 用户登陆 */}
          <Route path="userLogin" element={<UserLogin />} />
          <Route path="userLogin@Core" element={<UserLoginCore />} />
          <Route path="userLogin@React" element={<UserLoginReact />} />
          <Route path="userLogin@Reactive" element={<UserLoginReactive />} />


          <Route path="final" element={<Final />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
