import React from "react"
import Home from "./Pages/Home/Home"
import Market from "./Pages/Market/Market"
import Pairs from "./Pages/Market/Pairs"
import Chart from "./Pages/Chart/Chart"
import News from "./Pages/News/News"


let routes = [
    {path:'/' , element:<Home/>},
    {path:'/market/*' , element:<Market/>, children : [
        {path:'pair/:id' , element:<Pairs/>},
    ]},
    {path:'/news' , element: <News/>},
    {path:'/Chart' , element:<Chart/>},
    

]


export default routes