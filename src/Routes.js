import React from "react"
import Home from "./Pages/Home/Home"

let routes = [
    {path:'/' , element:<Home/>},
    {path:'/market/*' , element:<p className="font-sans text-text-light dark:text-text-dark">Market</p>, children : [
        {path:'pair' , element:<p>Pair</p>},
    ]},
    {path:'/news' , element:<p className="font-sans text-text-light dark:text-text-dark">News</p>},
    {path:'/Chart' , element:<p className="font-sans text-text-light dark:text-text-dark">Chart</p>},
    

]


export default routes