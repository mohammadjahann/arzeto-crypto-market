import { useState, useEffect } from 'react';


const API_KEY = 'CG-Bqgd2kZzSgqPgsJKEvZvopvi';
const BASE_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd';

export const useChartData = (timeframe) => {

    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true); 
            setError(null);     

            
            let url;
            if (timeframe === 'H1') {
                url = `${BASE_URL}&days=1`;
            } else if (timeframe === 'H4') {
                url = `${BASE_URL}&days=30`; 
            } else { // 'Daily'
                url = `${BASE_URL}&days=30`;
            }

            try {
                const response = await fetch(url, {
                    headers: {
                        'accept': 'application/json',
                        'x-cg-demo-api-key': API_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Something went wrong with fetching data!');
                }

                const datas = await response.json();

                
                let processedData;

                if (timeframe === 'H1') {
                    let defineDatas = datas.map(data => ({
                        date: `${new Date(data[0]).getHours()}:00`,
                        close: data[4]
                    }));
                    let finalData = [];
                    let correct = { date: '', close: '' };
                    defineDatas.forEach(data => {
                        if (correct.date !== data.date) {
                            finalData.push(data);
                            correct = data;
                        }
                    });
                    processedData = finalData;

                } else if (timeframe === 'H4') {
                    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    processedData = datas.map(data => ({
                        date: `${daysOfWeek[new Date(data[0]).getDay()]} ${new Date(data[0]).getHours()}:00`,
                        close: data[4]
                    })).slice(0, 30); 

                } else { // 'Daily'
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
                    processedData = dailyCloses;
                }

                setChartData(processedData);

            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData();

    }, [timeframe]); 

    
    return { chartData, isLoading, error };
};
