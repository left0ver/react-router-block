import React from "react"
import {RouteObject} from "react-router-dom"
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import ProfileDetail from '../pages/Profile/ProfileDetail'
import ProfileSetting from '../pages/Profile/ProfileSetting'
const routes:RouteObject[] = [
{
    path: '/',
    element:<Home/>
},
{
    path: '/cart',
    element:<Cart/>
},
{
    path: '/login',
    element:<Login/>
},
{
    path: '/profile',
    element:<Profile/>,
    children:[
        {
            index:true,
            element:<ProfileSetting/>
        },
        {
            path:'setting',
            element:<ProfileSetting/>
        },
        {
            path:'detail',
            element:<ProfileDetail/>
        }
    ]
}
]

export default routes