import React, { useEffect, useState, useRef } from 'react'
import { Outlet, Link, data } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { supabase } from "./../../supabaseClient";
import { Mosaic } from 'react-loading-indicators';


export default function Market() {

    const [coins, setCoins] = useState([])
    const [curentPage, setCurentPage] = useState(1)
    const [curentCoins, setCurentCoins] = useState([])
    const [paginationNumbers, setPaginationNumbers] = useState([])
    const[loading,setLoading] = useState(true)
    const inputRef = useRef()
    const pageShowNumber = 20


    const API_KEY = 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'


    useEffect(() => {
        if (coins.length > 0) {
            const totalPages = Math.ceil(coins.length / pageShowNumber);
            const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
            setPaginationNumbers(pagesArray);

            const showingEnd = curentPage * pageShowNumber;
            const showingStart = showingEnd - pageShowNumber;

            const selectedCoins = coins.slice(showingStart, showingEnd);
            setCurentCoins(selectedCoins);
        }
    }, [coins, curentPage])

    useEffect(() => {

        const fetchCoins = async () => {


            const { data, error } = await supabase
                .from("coins")
                .select("*")



            if (error) {
                console.error(" خطا در گرفتن دیتا:", error);
            } else {
                console.log(data);
                

                setCoins(data)
                setLoading(false)
            }
        };

        fetchCoins();

    }, [])

    const pageBtnHandler = (e) => {
        setCurentPage(Number(e.target.name))
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const searchBtnHandler = async () => {
        setLoading(true)
        let query = inputRef.current.value;

        fetch(`https://api.coingecko.com/api/v3/search?query=${query}`, {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': API_KEY
            }
        })
            .then(res => res.json())
            .then(async datas => {
                console.log("نتیجه سرچ:", datas.coins);

               
                const ids = datas.coins.map(c => c.id).join(",");

                if (!ids) return;

                
                const res2 = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true`,
                    {
                        headers: {
                            'accept': 'application/json',
                            'x-cg-demo-api-key': API_KEY
                        }
                    }
                );
                const fullData = await res2.json();
                
                setCoins(fullData);
                setLoading(false)
                
            })
            .catch(err => console.error(err));
    };




    return (
        <div className=' w-[80%] mx-auto flex flex-col justify-center items-center mt-1 min-h-[100vh]'>
            <div className='flex flex-col justify-center items-center gap-3 '>
                <h1 className=' text-text-light dark:text-text-dark font-bold md:text-2xl'>تمامی ارز ها </h1>
                <p className='text-text-light dark:text-text-dark text-sm text-center'>با ارزتو دنیای ارز های دیجیتال را جستجو کنید</p>
            </div>
            <div className=' w-full flex items-center justify-center gap-4'>
                <input
                    ref={inputRef}
                    placeholder='نام ارز مورد نظر را وارد کنید'
                    type="text"
                    className=' w-1/2 h-8 rounded-xl bg-secondary-light dark:bg-secondary-dark text-right p-3 outline-none focus:outline-blue-500 my-4' />
                <button
                    onClick={searchBtnHandler}
                    className='flex flex-row-reverse items-center justify-center gap-4 bg-secondary-light dark:bg-secondary-dark py-2 px-3 rounded-xl hover:scale-[120%] duration-500 text-text-light dark:text-text-dark'> جستجو <FaSearch /></button>
            </div>


            <div className='flex flex-col p-3 bg-secondary-light dark:bg-secondary-dark rounded-2xl items-center justify-around w-full'>
                <div className='flex items-center justify-center flex-wrap gap-3 font-sans'>
                    {curentCoins ? curentCoins.map(data => {
                        return <div
                            key={data.id}
                            className='h-[30vh] w-[45%] md:w-[43%] lg:w-[23%] flex flex-col items-center justify-between  
                       bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                       transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
                       hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
                       hover:from-green-400 hover:to-emerald-600 p-2 text-center it'>
                            <img
                                className=' w-14 h-14 sm:w-20 sm:h-20 rounded-full'
                                src={data.image || data.large} alt="" />
                            <h1
                                className=' text-text-light dark:text-text-dark font-bold sm:text-2xl '>{data.symbol}</h1>
                            <p
                                className='text-text-light dark:text-text-dark font-sans sm:text-[16px] '>${data.current_price}</p>
                            <Link
                                className=' font-MTNIrancell-DemiBold px-3 py-2 bg-secondary-light dark:bg-secondary-dark rounded-xl text-text-light dark:text-text-dark'
                                to={`pair/${data.id}`} state={data}>
                                اطلاعات
                            </Link>

                        </div>
                    }) : (
                        <div>data is Loading</div>
                    )}
                </div>

                {/* Pagination render */}

                <div className='mt-7 rounded-md overflow-hidden flex gap-2 items-center justify-center flex-wrap'>
                    {paginationNumbers.length > 0 && (() => {
                        const totalPages = paginationNumbers.length;
                        const active = curentPage;
                        const pageButtons = [];

                        // get before and after button number
                        const startPage = Math.max(1, active - 1);
                        const endPage = Math.min(totalPages, active + 1);

                        // define first page always
                        if (startPage > 1) {
                            pageButtons.push(
                                <button key={1} onClick={pageBtnHandler} name={1} className={`px-3 py-2 font-sans ${curentPage === 1 ? 'bg-blue-800 text-white' : 'bg-blue-400 hover:bg-slate-500'}`}>1</button>
                            );
                            if (startPage > 2) pageButtons.push(<span key="start-ellipsis" className=' text-black dark:text-white'>...</span>);
                        }

                        // middle buttons
                        for (let i = startPage; i <= endPage; i++) {
                            pageButtons.push(
                                <button key={i} onClick={pageBtnHandler} name={i} className={`px-3 py-2 font-sans ${curentPage === i ? 'bg-blue-800 text-white' : 'bg-blue-400 hover:bg-slate-500'}`}>{i}</button>
                            );
                        }

                        // define last page always
                        if (endPage < totalPages) {
                            if (endPage < totalPages) pageButtons.push(<span key="end-ellipsis" className=' text-black dark:text-white'>...</span>);
                            pageButtons.push(
                                <button key={totalPages} onClick={pageBtnHandler} name={totalPages} className={`px-3 py-2 font-sans ${curentPage === totalPages ? 'bg-blue-800 text-white' : 'bg-blue-400 hover:bg-slate-500'}`}>{totalPages}</button>
                            );
                        }

                        return pageButtons;
                    })()}
                </div>


            </div>
            {/* pair page */}
            <Outlet />

            {/* Loading */}

            {loading && (
                <div className=' inset-0 bg-black/40 fixed z-50 flex items-center justify-center'>
                    <Mosaic color="#5ac2e1" size="medium" text="" textColor="" />
                </div>
            )}
        </div>
    )
}
