import React, { useState,lazy,Suspense } from 'react';
import {Link,Routes,Route} from 'react-router-dom'
// 导入类型和组件
import  RouterBlock  from 'react-router-block'
import type {Next,To,From} from 'react-router-block'
// 导入路由表
import routes from './router';
import './App.css'
// 懒加载导入，使用children的写法可以使用懒加载
const Home = lazy(() =>import ("./pages/Home"))
const Cart = lazy(() =>import ("./pages/Cart"))
const Login = lazy(() =>import ("./pages/Login"))
const Profile = lazy(() =>import ("./pages/Profile"))
const ProfileSetting = lazy(() =>import ("./pages/Profile/ProfileSetting"))
const ProfileDetail = lazy(() =>import ("./pages/Profile/ProfileDetail"))
function App() {
  const [msg,setMsg] =useState('未登录')
  const [isLogin,setIsLogin] = useState(false)
  return (
    <div className="App">
      <Link to="/">去Home页面</Link>
      <Link to="/cart">去Cart页面</Link>
      <Link to="/login">去Login页面</Link>
      <Link to="/profile">去Profile页面</Link>
      <Link to="/profile/setting">去ProfileSetting页面</Link>
      <Link to="/profile/detail">去ProfileDetail页面</Link>
      <RouterBlock routes={routes} beforeEnter={(to:To,next:Next,from:From) => {
        if (to.path!=='/login' && to.path!=="/" && !isLogin) {
          next('/login');
        }else {
          next()
        }
      }}>
        {/* 使用children的写法 ，routes和children同时有,children生效*/}
      <Routes>
        <Route path="/" element={<Suspense><Home/></Suspense>} />
        <Route path="/cart" element={<Suspense><Cart/></Suspense>} />
        <Route path="/login" element={<Suspense><Login/></Suspense>} />
        <Route path="/profile" element={<Suspense><Profile/></Suspense>} >
           <Route index element={<Suspense><ProfileSetting/></Suspense>} />
           <Route path="setting" element={<Suspense><ProfileSetting/></Suspense>} />
           <Route path="detail" element={<Suspense><ProfileDetail/></Suspense>} />
        </Route>
      </Routes>
      </RouterBlock>
      <br />
      <div>{msg}</div>
      <br />
      <button onClick={handleClick}>改变登录状态</button>
    </div>
  ); 

  function handleClick() {
    !isLogin ? setMsg('已登录'):setMsg('未登录')
    setIsLogin(!isLogin);
  }
}

export default App;
