import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout";
import Home from './pages/Home';
import NormalForm from './pages/01.FormGuide/NormalForm/index';
import AntForm from './pages/01.FormGuide/AntForm';
import FormilyForm from './pages/01.FormGuide/FormilyForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          {/* --- 原生方式实现联动 --- */}
          <Route path="normalForm" element={<NormalForm />} />
          {/* antd 方式实现联动 */}
          <Route path="antForm" element={<AntForm />} />
          {/* formily 方式实现联动 */}
          <Route path="formilyForm" element={<FormilyForm />} />
          {/* --- 原生方式实现联动 --- */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
