import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import Navbar from "./Components/Navbar";

function App() {
  const [isDark, setIsDark] = useState(false)

  const darkModeHandler = (data)=>{
    
    setIsDark(data)
    
  }

  const router = useRoutes(routes)
  return (
    <div className={`${isDark ? 'dark' : ''} min-h-full bg-primary-light dark:bg-primary-dark font-MTNIrancell-Medium`}>
      <Navbar darkModeHandler={darkModeHandler} />
      {/* Divider */}
      <div className="h-[70px] w-full border-b border-gray-300 dark:border-gray-700"></div>

      {router}

    </div>
  );
}

export default App;
