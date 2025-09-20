import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate, data } from 'react-router-dom'
import { AreaChart, Line, LineChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


export default function Pairs() {
    const [chartData, setChartData] = useState()
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(false);

    // get data from url
    const coinData = location.state
    const [coin, setCoin] = useState(coinData || null)






    useEffect(() => {

        // get data if URL is null

        if (!coin) {
            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`)
                .then(res => res.json())
                .then(data => setCoin(data[0]))
                .catch(err => console.log(err))

        }

        //////////////////////////////////

        // check screen size

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();

        window.addEventListener("resize", checkMobile);

        /////////////////////////////////

        // get data for chart

        fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=2`, {
            headers: {
                'accept': 'application/json',
                'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
            }
        })
            .then(res => res.json())
            .then(datas => {

                const priceData = []
                datas.prices.forEach(data => {
                    priceData.push({ time: `${new Date(data[0]).getHours()}:00`, price: data[1] })
                })
                

                setChartData(priceData)

            })
            .catch(err => {
                console.log('eror in loading : ', err);

            })

        //////////////////////////////////////////

        // Disable scroll

        document.body.style.overflow = "hidden";


        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("resize", checkMobile)
        };



    }, [id, coin])



    useEffect(() => {



    }, []);

    if (!coin) return <div className="text-white">Loading...</div>

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-[8px] font-sans'>
            <div className='w-[90%] h-[85vh] flex flex-col items-center justify-center  bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl p-6 text-white relative'>


                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-12 right-3 px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50"
                >
                    Close
                </button>
                <div className='flex items-center justify-between w-full h-full flex-col-reverse md:flex-row gap-2'>

                    <ResponsiveContainer width={isMobile ? '100%' : '67%'} height='100%' className='bg-white/40 md:p-10 rounded-xl'>
                        <LineChart data={chartData}>

                            <YAxis
                                domain={['auto', 'auto']}
                                width={isMobile ? 10 : 40}
                                hide={isMobile}
                                stroke='#fff'

                            />
                            <Tooltip itemStyle={{ color: "#000" }} />
                            <Legend />
                            <XAxis dataKey='time' stroke='#fff' />
                            <Line type="monotone" dataKey="price" stroke="#FFF" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>

                    <div className='flex flex-col items-center justify-center w-full md:w-[29%] border-1px bg-white/40 rounded-2xl h-full '>
                        <h1 className="text-3xl font-bold">{coin.name}</h1>
                        <img src={coin.image} alt={coin.name} className="w-20 h-20 mt-4" />
                        <p className="mt-2">Price: ${coin.current_price}</p>
                        <p className="mt-2">Market Cap: {coin.market_cap}</p>
                        <p className="mt-2">24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                </div>



            </div>
        </div>
    )
}

