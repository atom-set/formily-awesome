import React, { Suspense } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { lazy } from 'react'
import Layout from "./components/Layout";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// 联动
const NormalLinkage = lazy(() => import('./pages/01.FormLinkage/NormalForm/index'));
const AntLinkage = lazy(() => import('./pages/01.FormLinkage/AntForm'));
const FormilyLinkage = lazy(() => import('./pages/01.FormLinkage/FormilyForm'));

// 用户登陆注册
const UserLoginV1 = lazy(() => import('./pages/02.UserLogin/V1'));
const UserLoginV2 = lazy(() => import('./pages/02.UserLogin/V2'));
const UserLoginV3 = lazy(() => import('./pages/02.UserLogin/V3'));

// FormItem 封装
const FormItemV1 = lazy(() => import('./pages/03.FormItem/V1'));
const FormItemV2 = lazy(() => import('./pages/03.FormItem/V2'));
const FormItemV3 = lazy(() => import('./pages/03.FormItem/V3'));

// arrayTable
const ArrayTableDemo = lazy(() => import('./pages/04.ArrayTable/index'));
// formTab
const FormTabDemo = lazy(() => import('./pages/05.FormTab/index'));

// Observer
const ObserverRef = lazy(() => import('./pages/06.Observer/01.ref'));

// antd源码系统
const AntdV1 = lazy(() => import('.//pages/20.Antd/V1'));
const AntdV2 = lazy(() => import('.//pages/20.Antd/V2'));
const AntdV3 = lazy(() => import('.//pages/20.Antd/V3'));

const AntdV8 = lazy(() => import('./pages/20.Antd/V8'));
const AntdV9 = lazy(() => import('./pages/20.Antd/V9'));

// reactive系列
const ReactiveV1 = lazy(() => import('./pages/21.Reactive/V1'))
const ReactiveV2 = lazy(() => import('./pages/21.Reactive/V2'))

// RegisterPatches 
const RegisterPatchesV1 = lazy(() => import('./pages/22.RegisterPatches/V1'))

// 原生React API
const ForwardRefApiV1 = lazy(() => import('./pages/30.ReactApi/forwardRefV1'))
const ForwardRefApiV2 = lazy(() => import('./pages/30.ReactApi/forwardRefV2'))
const ForwardRefApiV3 = lazy(() => import('./pages/30.ReactApi/forwardRefV3'))
const UseContentV1 = lazy(() => import('./pages/30.ReactApi/useContentV1'))

// designable 
const DesignableLoginPage = lazy(() => import('./pages/40.Designable/login'))



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />} >
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<About />} />
              <Route path="/debugger" element={<AntdV9 />} />

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

              {/* FormItem封装 */}
              <Route path="formItem/v1" element={<FormItemV1 />} />
              <Route path="formItem/v2" element={<FormItemV2 />} />
              <Route path="formItem/v3" element={<FormItemV3 />} />

              {/* ant design 系列*/}
              <Route path="antd/v1" element={<AntdV1 />} />
              <Route path="antd/v2" element={<AntdV2 />} />
              <Route path="antd/v3" element={<AntdV3 />} />
              <Route path="antd/v8" element={<AntdV8 />} />
              <Route path="antd/v9" element={<AntdV9 />} />

              {/* arrayTable */}
              <Route path="arrayTable" element={<ArrayTableDemo />} />

              {/* formTab */}
              <Route path="formTab" element={<FormTabDemo />} />

              {/*  observer */}
              <Route path="observer/ref" element={<ObserverRef />} />

              {/* reactive系列 */}
              <Route path="reactive/v1" element={<ReactiveV1 />} />
              <Route path="reactive/v2" element={<ReactiveV2 />} />

              {/* RegisterPatchesV1  */}
              <Route path="registerPatches/v1" element={<RegisterPatchesV1 />} />

              {/* React API */}
              <Route path="api/forwardRef/v1" element={<ForwardRefApiV1 />} />
              <Route path="api/forwardRef/v2" element={<ForwardRefApiV2 />} />
              <Route path="api/forwardRef/v3" element={<ForwardRefApiV3 />} />
              <Route path="api/useContent/v1" element={<UseContentV1 />} />

              <Route path="designable/login" element={<DesignableLoginPage />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
