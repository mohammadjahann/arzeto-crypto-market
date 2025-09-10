import React, { useEffect, useState } from 'react'

export default function TrendingCart({ data }) {
    const [price, setPrice] = useState(null);
    const [percent, setPercent] = useState(null)
    const [marketCap, setMarketCap] = useState()

    useEffect(() => {
        let coinName = data.item.id;
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`, {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
            }
        })
            .then(res => res.json())
            .then(datas => {



                setPrice(datas[coinName].usd);
                setPercent(datas[coinName].usd_24h_change.toFixed(2))
                setMarketCap(datas[coinName].usd_market_cap)
            })
            .catch(err => console.error(err));



    }, [data]);

    return (
        <div
            className='h-[30vh] w-[40%] md:w-[23%] lg:w-[15%] flex flex-col items-center justify-between  
                       bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                       transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
                       hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
                       hover:from-green-400 hover:to-emerald-600 p-2'>

            <img
                className='w-10 h-10 md:w-12 md:h-12 rounded-full'
                src={data.item.large} alt={data.item.name} />

            <h1 className='text-text-light dark:text-text-dark'>
                {data.item.name}
            </h1>

            <p className='text-green-500 font-bold font-sans'>
                {price ? `$${price}` : "Loading..."}
            </p>

            {percent && (
                <p className={`font-bold font-sans ${percent.includes('-') ? 'text-red-400' : 'text-green-500'}`}>
                    {percent ? `%${percent}` : "Loading..."}
                </p>
            )}

            {marketCap && (
                <p className='text-text-light dark:text-text-dark text-[8px] sm:text-[12px]  font-sans'>
                    {marketCap ? `Mcap :${Math.round(marketCap)}` : "Loading..."}
                </p>
            )}



        </div>
    )
}
