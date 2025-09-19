import React from "react"
import Home from "./Pages/Home/Home"

let routes = [
    {path:'/' , element:<Home/>},
    {path:'/market/*' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">Market</p>, children : [
        {path:'pair/:id' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">Pairs</p>},
    ]},
    {path:'/news' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">News</p>},
    {path:'/Chart' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">Chart</p>},
    

]


export default routes