import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
    return (
        <div className=' w-[80%] mx-auto flex items-center justify-between py-3 '>
            <div className="text-2xl text-text-light dark:text-text-dark">
                <p>
                    ARZE<span className="text-red-400">TO</span>
                </p>
            </div>

            <p className='  hidden md:block font-sans text-text-light dark:text-text-dark'>© 2025 React project . Design with ♥️ by Jahan.</p>

            <ul className=' flex gap-4'>
                <li className=' text-red-600 text-2xl hover:text-orange-400 duration-300'><a target='blink' href="https://www.instagram.com/mohammadjahann/"><FaInstagram /></a></li>
                <li className=' text-red-600 text-2xl hover:text-orange-400 duration-300'><a target='blink' href="https://github.com/mohammadjahann"><FaGithub /></a></li>
            </ul>
        </div>
    )
}
