import React, { useState } from 'react';
import {Link} from 'react-router-dom'
// 导入类型和组件
import  RouterBlock  from 'react-router-block'
import type {Next,RouterLocation,From} from 'react-router-block'
// 导入路由表
import routes from './router';
import './App.css'
function App() {
  const [msg,setMsg] =useState('未登录')
  const [isLogin,setIsLogin] = useState(false)
  return (
    <div className="App">
      <Link to="/home">去Home页面</Link>
      <Link to="/cart">去Cart页面</Link>
      <Link to="/login">去Login页面</Link>
      <Link to="/profile">去Profile页面</Link>
      <Link to="/profile/setting">去ProfileSetting页面</Link>
      <Link to="/profile/detail">去ProfileDetail页面</Link>
      <RouterBlock routes={routes} beforeEnter={(to:RouterLocation,next:Next,from:From) => {
        if (to.path!=='/login' && to.path!=="/" && !isLogin) {
          next('/login');
        }else {
          next()
        }
      }}/>
      <br />
      <div>{msg}</div>
      <br />
      <button onClick={handleClick}>改变登录状态</button>
    </div>
  ); 

  function handleClick() {
    if (!isLogin) {
      setMsg('已登录')
    }else {
      setMsg('未登录')
    }
    setIsLogin(!isLogin);
  }
}

export default App;
