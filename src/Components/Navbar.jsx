import React, { useState, useEffect } from 'react';
import { IoSunny, IoMoonSharp } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

export default function Navbar({ darkModeHandler }) {
    const [isDark, setIsDark] = useState(false);
    const [showSideMenu, setShowSideMenu] = useState(false);

    useEffect(() => {
        darkModeHandler(isDark);
    }, [isDark]);

    // Disable body scroll when side menu is open
    useEffect(() => {
        if (showSideMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset'; // Clean up on unmount
        };
    }, [showSideMenu]);

    const darkModeBtn = () => {
        setIsDark(prev => !prev);
    };

    const menu = data => {
        return (
            <ul className={`${data} flex-row-reverse text-text-light dark:text-text-dark`}>
                <li>
                    <NavLink className={isActive} to={'/'} onClick={() => setShowSideMenu(false)}>
                        خانه
                    </NavLink>
                </li>
                <li>
                    <NavLink className={isActive} to={'/market'} onClick={() => setShowSideMenu(false)}>
                        ارز ها
                    </NavLink>
                </li>
                <li>
                    <NavLink className={isActive} to={'/news'} onClick={() => setShowSideMenu(false)}>
                        اخبار
                    </NavLink>
                </li>
                <li>
                    <NavLink className={isActive} to={'/Chart'} onClick={() => setShowSideMenu(false)}>
                        نمودار
                    </NavLink>
                </li>
            </ul>
        );
    };

    const darkMode = (exra) => {
        return (
            <div
                onClick={darkModeBtn}
                className={` ${exra} relative h-6 w-[50px] cursor-pointer items-center rounded-3xl bg-slate-400 p-1 ${isDark ? 'justify-end' : 'justify-start'
                    }`}>
                <div className={`h-5 w-5 rounded-full bg-blue-500 transition-all duration-300`}></div>
                <IoSunny
                    className={`absolute right-[7px] text-yellow-400 transition-all duration-500 
                ${isDark ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                />
                <IoMoonSharp
                    className={`absolute left-[7px] text-slate-700 transition-all duration-500
                ${isDark ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                />
            </div>
        )
    }

    const isActive = ({ isActive }) => {
        return isActive ? 'border-b-2 border-lime-500 animate-fill-border' : '';
    };

    return (
        <nav className="bg-primary-light dark:bg-primary-dark flex items-center justify-between mx-auto max-w-[80%] py-3">
            {/* Logo section */}
            <div className="text-2xl text-text-light dark:text-text-dark">
                <p>
                    ARZE<span className="text-red-400">TO</span>
                </p>
            </div>

            {/* Menu section  */}
            {menu('hidden sm:flex gap-4')}

            {/* Buttons Section */}
            <div className="flex flex-row-reverse items-center gap-4 text-text-light dark:text-text-dark">
                <button className="hidden rounded-2xl bg-[#38E07B] px-3 py-2 shadow-[0px_0px_30px_1px_#BAFFC2] lg:block">
                    دریافت مشاوره
                </button>
                {/* Dark Mode */}
                {darkMode('hidden sm:flex')}


                {/* Hamburger menu */}
                <GiHamburgerMenu className="cursor-pointer sm:hidden text-3xl" onClick={() => setShowSideMenu(true)} />
            </div>

            {/* Backdrop for blur effect */}
            <div
                onClick={() => setShowSideMenu(false)} // Close menu when clicking outside
                className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-500
                ${showSideMenu ? 'pointer-events-auto opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}
            ></div>

            {/* Side Menu */}
            <div
                className={`fixed bottom-0 left-0 top-0 z-50 flex w-[70%] flex-col items-center gap-5 border-r border-gray-600
                    bg-gray-700 bg-opacity-30 pt-5 text-text-light dark:text-text-dark
                    transform transition-transform duration-500 backdrop-blur-md sm:w-[45%]
                    ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <RxCross2
                    className="absolute right-4 top-4 cursor-pointer text-3xl text-text-light dark:text-text-dark"
                    onClick={() => setShowSideMenu(false)}/>
                {menu('flex flex-col gap-8 text-xl')} 
                {darkMode('flex')}
            </div>
        </nav>
    );
}