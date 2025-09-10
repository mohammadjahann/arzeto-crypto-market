import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HomeChart() {
    const [chartData, setChartData] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showChartData, setShowChartData] = useState('Daily')



    useEffect(() => {
        
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640); 
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (showChartData === 'H1') {
            fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
                .then(res => res.json())
                .then(data => {
                    const prices = data.prices;
                    const hourlyClose = [];
                    let lastHour = null;

                    prices.forEach(item => {
                        const date = new Date(item[0]);
                        const hour = date.getHours();

                        if (hour !== lastHour) {
                            hourlyClose.push({ date: `${hour}:00`, close: item[1] });
                            lastHour = hour;
                        } else {
                            hourlyClose[hourlyClose.length - 1].price = item[1];
                        }
                    });

                    setChartData(hourlyClose);
                })
                .catch(err => console.error(err));
        } else if (showChartData === 'H4') {

            fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30')
                .then(res => res.json())
                .then(datas => {
                    let getdata = []
                    for (let i = 0; i < 30; i++) {
                        getdata.push(datas[i])
                    }

                    let finalData = getdata.map(data => {
                        const dateObj = new Date(data[0]);

                       
                        const day = dateObj.getDate();
                        const month = dateObj.getMonth() + 1; 
                        
                        const hours = dateObj.getHours().toString().padStart(2, "0");
                        const minutes = dateObj.getMinutes().toString().padStart(2, "0");

                        return {
                            date: `${day}/${month}  ${hours}:${minutes}`,
                            close: data[4]
                        }
                    });

                    

                    setChartData(finalData);
                })
                .catch(err => console.error(err));
        } else {
            //////// دیتای روزانه

            fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30', {
                headers: {
                    'accept': 'application/json',
                    'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
                }
            })
                .then(res => res.json())
                .then(datas => {
                    const dailyCloses = [];
                    let lastDate = null;

                    datas.forEach(item => {
                        const dateObj = new Date(item[0]);
                        const date = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`; 
                        const close = item[4];

                        if (date !== lastDate) {
                            dailyCloses.push({ date, close });
                            lastDate = date;
                        } else {
                            dailyCloses[dailyCloses.length - 1].close = close;
                        }
                    });


                    setChartData(dailyCloses);
                })
                .catch(err => console.error(err));
        }

    }, [showChartData]);

    
    return (
        <div className='bg-secondary-light dark:bg-secondary-dark flex flex-col items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 h-[80vh]'>
            <div className=" flex flex-col md:flex-row items-center justify-between w-[60%] p-1 gap-3 pt-2">
                <h1 className=" text-[13px] md:text-[20px] font-bold text-text-light dark:text-text-dark">نمودار فعلی بیتکوین</h1>
                <div>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="Daily"
                        className={` h-4 w-6  text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans rounded-l-lg ${showChartData==='Daily' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>D1</button>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="H1"
                        className={` h-4 w-6 text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans ${showChartData==='H1' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>H1</button>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="H4"
                        className={` h-4 w-6 text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans rounded-r-lg ${showChartData==='H4' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>H4</button>
                </div>

            </div>
            <ResponsiveContainer width="95%" height="95%">
                <AreaChart data={chartData} className=" md:p-3">
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="date" className=" text-[10px]" />
                    <YAxis
                        domain={['auto', 'auto']}
                        width={isMobile ? 0 : 40}
                        hide={isMobile}
                    />
                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#00C853"
                        strokeWidth={3}
                        fillOpacity={2}
                        fill="url(#colorPrice)"
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
