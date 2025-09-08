import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import Navbar from "./Components/Navbar";

function App() {
  const [isDark, setIsDark] = useState(false)

  const darkModeHandler = (data)=>{
    console.log(data);
    setIsDark(data)
    
  }

  const router = useRoutes(routes)
  return (
    <div className={`${isDark ? 'dark' : ''} min-h-full bg-primary-light dark:bg-primary-dark font-MTNIrancell-Medium`}>
      <Navbar darkModeHandler={darkModeHandler} />
      {/* Divider */}
      <div className=' w-full h-[2px] bg-Dividers-light dark:bg-Dividers-dark'></div>

      {router}

    </div>
  );
}

export default App;
