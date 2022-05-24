![bundle-size](https://img.shields.io/bundlephobia/min/react-router-block?color=green) 
![npm-version](https://img.shields.io/npm/v/react-router-block)
![license](https://img.shields.io/npm/l/react-router-block)
![language](https://img.shields.io/badge/language-typescript-blue)

# About

react-router-block是一个基于react-router v6版本的路由守卫，让你能使用像类似vue-router那样的路由守卫,虽然该守卫也能用于页面级的组件，但建议用在App.tsx里面当作全局的路由守卫即可，建议您在页面级的组件应该使用hooks来进行判断与跳转
# Install

```

 npm install react-router-block -S

```
# types

```typescript

 interface To {
     path: string;
     search:Search;
     state:unknow;
     key:Key;
     hash:Hash
 }
type From = To | null;
type Next = (path?: string) => void;
type BeforeEnter = ((to: To, next: Next, from: From) => void) | ((to: To, next: Next) => void);
interface RouterBlockProps {
    routes: RouteObject[];
    beforeEnter: BeforeEnter;
}


```
# Usage

```tsx
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
// 导入类型和组件
import  RouterBlock  from 'react-router-block'
import type {Next,RouterLocation,From} from 'react-router-block'
// 导入路由表
import routes from './router';
function App() {
  const [msg,setMsg] =useState('未登录')
  const [isLogin,setIsLogin] = useState(false)
  return (
    <div className="App">
      <Link to="/home">去Home页面</Link>
      <Link to="/login">去Login页面</Link>
      <Link to="/profile">去Profile页面</Link>
      <Link to="/profile/setting">去ProfileSetting页面</Link>

    {/*具体使用 RouterBlock要求传入两个参数，
      *一个是routes,就是react-router使用useRoutes配置的路由表,配置项和一模一样
      *第二个参数是beforeEnter, 调用next可以函数跳转到你要去的页面,调用多次以最后一次为准
      */}
      <RouterBlock routes={routes} beforeEnter={(to:To,next:Next,from:From) => {
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

```

这儿有一个[例子](https://github.com/left0ver/react-router-block/blob/main/example)，建议您看一看

# LICENSE

[MIT](https://github.com/left0ver/react-router-block/blob/main/LICENSE)
