import React, { useEffect, useState } from 'react'

export default function TopCoins() {

    const [coins, setCoins] = useState(null)

    useEffect(() => {

        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1', {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
            }
        })
            .then(res => res.json())
            .then(datas => {
                console.log(datas);
                setCoins(datas)

            })

    }, [])
    return (
        <div className='bg-secondary-light dark:bg-secondary-dark flex flex-col items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 min-h-[50vh] p-3'>
            <p className=' mt-2 font-bold text-text-light dark:text-text-dark text-[15px] sm:text-[20px]'> :ارز های برتر</p>

            <div className=' flex w-full items-center justify-around flex-wrap p-3'>
                {coins ? coins.map(data => {
                    return <div
                        key={data.id}
                        className='h-[30vh] w-[45%] md:w-[43%] lg:w-[23%] flex flex-col items-center justify-between  
                       bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                       transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
                       hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
                       hover:from-green-400 hover:to-emerald-600 p-2'>
                        <img
                        className=' w-16 h-16 sm:w-20 sm:h-20 rounded-full' 
                        src={data.image} alt="" />
                        <h1
                            className=' text-text-light dark:text-text-dark font-bold sm:text-2xl '>{data.name}</h1>
                        <p
                            className='text-text-light dark:text-text-dark font-bold font-sans sm:text-xl '>${data.current_price}</p>
                    </div>
                }) : (
                    <div>data is Loading</div>
                )}
            </div>


        </div>
    )
}
