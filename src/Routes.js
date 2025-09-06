import React from "react"

let routes = [
    {path:'/' , element:<p>Home</p>},
    {path:'/market/*' , element:<p>Market</p>, children : [
        {path:'pair' , element:<p>Pair</p>},
    ]},
    {path:'/news' , element:<p>News</p>},
    {path:'/Chart' , element:<p>News</p>},
    

]


export default routes