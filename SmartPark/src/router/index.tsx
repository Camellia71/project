/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
const Home=React.lazy(()=>import('../page/home'));
const NotFound=React.lazy(()=>import('../page/404'));   
const Login=React.lazy(()=>import('../page/login')); 


const router=createBrowserRouter ([
    {
            path:"/",
    element:<Home/>
    },{
        path:'/login',
        element:<Login/>
    },{
        path:'*',
        element:<NotFound/>
    }
])
export default router
