import React, { useEffect, useRef, useState, useContext } from "react";
import { createChart } from "lightweight-charts";
import darkModeContext from "../../contexts/darkModecontext";
import { Mosaic } from 'react-loading-indicators';

export default function Chart() {
  const chartContainerRef = useRef();
  const [chartHeight, setChartHeight] = useState(window.innerHeight);
  const [coinName, setCoinName] = useState('bitcoin')
  const [loading, setLoading] = useState(true)
  const contextData = useContext(darkModeContext)


  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // ساخت چارت
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartHeight,
      layout: {
        background: { color: contextData.isDark ? '#1C1C1D' : '#F0F2F5' },
        textColor: contextData.isDark ? '#fff' : "#333",
      },
      grid: {
        vertLines: { color: contextData.isDark ? '#333' : '#eee' },
        horzLines: { color: contextData.isDark ? '#333' : '#eee' },
      },
      crosshair: { mode: 1 },
      rightPriceScale: {
        visible: true
      },
      timeScale: {
        rightOffset: 0,      // فاصله کندل آخر از سمت راست = 0
        barSpacing: 15,      // فاصله بین کندل‌ها
        fixRightEdge: false, // مهم! اجازه می‌ده کندل‌ها به سمت چپ بچسبن
      },
    });


    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#f44336",
      borderVisible: false,
      wickUpColor: "#4caf50",
      wickDownColor: "#f44336",
    });

    fetch(`https://api.coingecko.com/api/v3/coins/${coinName}/ohlc?vs_currency=usd&days=30`, {
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-Bqgd2kZzSgqPgsJKEvZvopvi'
      }
    })
      .then(res => res.json())
      .then(datas => {
        const chartData = datas.map(item => ({
          time: Math.floor(item[0] / 1000),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        candleSeries.setData(chartData);
        setLoading(false)
      })
      .catch(err => console.error(err));

    // update chart size on height change
    const resizeObserver = new ResizeObserver(() => {
      chart.resize(chartContainerRef.current.clientWidth, window.innerHeight);
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [chartHeight, contextData.isDark, coinName]);

  return (
    <div className=" flex items-center justify-center flex-col">
      <div className=" mt-4 rounded-lg overflow-hidden">
        <button className={`px-3 py-2 text-[10px] md:text-lg bg-secondary-light dark:bg-secondary-dark ${coinName === 'bitcoin' ? 'bg-slate-500 dark:bg-slate-500 text-text-dark' : ''} text-text-light dark:text-text-dark hover:bg-slate-300 duration-300`} name="bitcoin" onClick={(e) => { setCoinName(e.target.name); setLoading(true) }}>BTC</button>
        <button className={`px-3 py-2 text-[10px] md:text-lg bg-secondary-light dark:bg-secondary-dark ${coinName === 'solana' ? 'bg-slate-500 dark:bg-slate-500 text-text-dark' : ''} text-text-light dark:text-text-dark hover:bg-slate-300 duration-300`} name="solana" onClick={(e) => { setCoinName(e.target.name); setLoading(true) }}>SOLANA</button>
        <button className={`px-3 py-2 text-[10px] md:text-lg bg-secondary-light dark:bg-secondary-dark ${coinName === 'ethereum' ? 'bg-slate-500 dark:bg-slate-500 text-text-dark' : ''} text-text-light dark:text-text-dark hover:bg-slate-300 duration-300`} name="ethereum" onClick={(e) => { setCoinName(e.target.name); setLoading(true) }}>ETH</button>
        <button className={`px-3 py-2 text-[10px] md:text-lg bg-secondary-light dark:bg-secondary-dark ${coinName === 'dogecoin' ? 'bg-slate-500 dark:bg-slate-500 text-text-dark' : ''} text-text-light dark:text-text-dark hover:bg-slate-300 duration-300`} name="dogecoin" onClick={(e) => { setCoinName(e.target.name); setLoading(true) }}>DOG</button>
      </div>

      {/* Chart */}
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: chartHeight }}
        className=""></div>


      {loading && (
        <div className=' inset-0 bg-black/40 fixed z-50 flex items-center justify-center'>
          <Mosaic color="#5ac2e1" size="medium" text="" textColor="" />
        </div>
      )}
    </div>
  );
}
