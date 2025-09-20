import React from "react"
import Home from "./Pages/Home/Home"
import Market from "./Pages/Market/Market"
import Pairs from "./Pages/Market/Pairs"

let routes = [
    {path:'/' , element:<Home/>},
    {path:'/market/*' , element:<Market/>, children : [
        {path:'pair/:id' , element:<Pairs/>},
    ]},
    {path:'/news' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">News</p>},
    {path:'/Chart' , element:<p className="font-sans text-text-light dark:text-text-dark h-[100vh]">Chart</p>},
    

]


export default routes