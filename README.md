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
    routes?: RouteObject[];
    beforeEnter: BeforeEnter;
    children?: React.ReactNode
}

```

# Usage

RouterBlock可以传入两个参数
1. 第一个参数是beforeEnter, 调用next可以函数跳转到你要去的页面,调用多次以最后一次为准 （必传）

2. 一个是routes,就是react-router使用useRoutes配置的路由表,配置项和react-router的一模一样（可选）
或者一个children（在RouterBlock组件内部配置路由，和react-router配置路由的方式一样）,**routes和children二者必须要有一个**,如果两者都有，则children的配置会生效,使用children的方式配置路由的时候可以使用懒加载

```tsx

import {Routes,Route} from 'react-router-dom'
// 导入类型和组件
import  RouterBlock  from 'react-router-block'
import type {Next,To,From} from 'react-router-block'
// 导入路由表
import routes from './router';

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
      {/*routes的写法*/}
      <RouterBlock routes={routes} beforeEnter={(to:To,next:Next,from:From) => {
        if (to.path!=='/login' && to.path!=="/" && !isLogin) {
          next('/login');
        }else {
          next()
        }
      }}>
        {/* 使用children的写法 */}
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

这儿有一个[例子](https://github.com/left0ver/react-router-block/blob/main/example)，建议你看一看

# LICENSE

[MIT](https://github.com/left0ver/react-router-block/blob/main/LICENSE)
