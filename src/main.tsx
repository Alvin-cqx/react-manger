import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// 路由1
// import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
// // eslint-disable-next-line react-refresh/only-export-components
// function ReactDemo() {
//   return <h2>欢迎学习react</h2>
// }
// // eslint-disable-next-line react-refresh/only-export-components
// function ViteDemo() {
//   return <h2>欢迎学习Vit</h2>
// }
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // 路由1
  // <HashRouter>
  //   <Routes>
  //     <Route path='/' element={<App />}></Route>
  //     <Route path='/react' element={<ReactDemo></ReactDemo>}></Route>
  //     <Route path='/vite' element={<ViteDemo></ViteDemo>}></Route>
  //   </Routes>
  // </HashRouter>
)
