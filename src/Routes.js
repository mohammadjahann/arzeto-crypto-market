import React from "react"
import Home from "./Pages/Home/Home"

let routes = [
    {path:'/' , element:<Home/>},
    {path:'/market/*' , element:<p>Market</p>, children : [
        {path:'pair' , element:<p>Pair</p>},
    ]},
    {path:'/news' , element:<p>News</p>},
    {path:'/Chart' , element:<p>Chart</p>},
    

]


export default routes