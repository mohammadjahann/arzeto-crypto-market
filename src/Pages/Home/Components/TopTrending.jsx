import React, { useEffect, useState } from 'react'
import TrendingCart from './TrendingCart';

export default function TopTrending() {

    const [trending, setTrending] = useState()

    useEffect(() => {

        fetch('https://api.coingecko.com/api/v3/search/trending', {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
            }
        })
            .then(res => res.json())
            .then(datas => {

                let coins = datas.coins.slice(0, 6)
                setTrending(coins)




            })


    }, [])
    return (
        <div
            className='bg-secondary-light dark:bg-secondary-dark flex  items-center justify-around mx-auto max-w-[80%] rounded-xl my-5 p-2  flex-wrap'>

            <p className=' mt-2 font-bold text-text-light dark:text-text-dark text-[15px] sm:text-[20px]'> :ارز های درحال ترند شدن</p>
            <div className=' flex flex-wrap w-full items-center justify-around mb-3'>
                {trending ? trending.map(data => {
                    return <TrendingCart key={data.item.id} data={data} />
                }) : <p>dataLoading</p>}
            </div>
        </div>
    )
}
