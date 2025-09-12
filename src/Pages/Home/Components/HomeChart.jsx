import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useChartData } from "../../../CustomHooks/useChartData";

export default function HomeChart() {
    const [isMobile, setIsMobile] = useState(false);
    const [showChartData, setShowChartData] = useState('Daily');

    
    const { chartData, isLoading, error } = useChartData(showChartData);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);



    if (isLoading) {
        return (
            <div className='bg-secondary-light dark:bg-secondary-dark flex items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 h-[80vh] text-text-light dark:text-text-dark'>
                در حال بارگذاری نمودار...
            </div>
        )
    }

    if (error) {
        return (
             <div className='bg-secondary-light dark:bg-secondary-dark flex items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 h-[80vh] text-red-500'>
                خطا در دریافت اطلاعات: {error}
            </div>
        )
    }

    return (
        <div className='bg-secondary-light dark:bg-secondary-dark flex flex-col items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 h-[80vh]'>
            <div className=" flex flex-col md:flex-row items-center justify-between w-[60%] p-1 gap-3 pt-2">
                <h1 className=" text-[13px] md:text-[20px] font-bold text-text-light dark:text-text-dark">نمودار فعلی بیتکوین</h1>
                <div>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="Daily"
                        className={` h-4 w-6  text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans rounded-l-lg ${showChartData === 'Daily' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>D1</button>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="H1"
                        className={` h-4 w-6 text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans ${showChartData === 'H1' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>H1</button>
                    <button onClick={e => setShowChartData(e.target.name)}
                        name="H4"
                        className={` h-4 w-6 text-[10px] md:h-10 md:w-16 md:text-[20px] font-sans rounded-r-lg ${showChartData === 'H4' ? 'bg-slate-500 text-slate-300 dark:bg-slate-300 dark:text-slate-500' : 'bg-primary-light text-text-light dark:text-text-dark dark:bg-primary-dark'}`}>H4</button>
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