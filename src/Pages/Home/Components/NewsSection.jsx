import React, { useEffect, useState } from 'react'

export default function NewsSection() {

    const [showingNews, setShowingNews] = useState()

    useEffect(() => {


        const API_KEY = '2e476cc4a6a8464b804ca1eac8172d7b'; 


        fetch(`https://newsapi.org/v2/everything?q=crypto&language=en&pageSize=3&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log("Articles about crypto:", data.articles);

                setShowingNews(data.articles)
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });



    }, [])

    const gettingword = content => {
        let allWords = content.split(" ")
        let selectWords = allWords.slice(0, 10)
        let finalText = `${selectWords.join(" ")} ...`

        return finalText
    }

    return (
        <div className='bg-secondary-light dark:bg-secondary-dark flex flex-col  items-center justify-center py-5 mx-auto max-w-[80%] rounded-xl my-5'>
             <p className=' mt-2 font-bold text-text-light dark:text-text-dark text-[15px] sm:text-[20px]'>  : آخرین اخبار</p>
            <div
                className=' flex w-full justify-around items-center flex-wrap '>
                {showingNews ? (
                    showingNews.map(data => {
                        return (
                            <div
                                className='h-[80vh] w-[70%] sm:w-[45%] lg:w-[30%] lg:h-[60vh] flex flex-col items-center   
                                bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                                  transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
                                hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
                                hover:from-green-400 hover:to-emerald-600 overflow-hidden relative'
                                key={data.id}>

                                <img className=' w-full h-[50%] size-fit' src={data.urlToImage} alt="" />
                                <h1 className=' font-bold text-xl text-center mt-2 text-text-light dark:text-text-dark'>{data.title}</h1>
                                <div>
                                    <p className='mt-2 text-text-light dark:text-text-dark'>{gettingword(data.content)}</p>
                                </div>
                                <button
                                
                                    className=' absolute bg-secondary-light dark:bg-secondary-dark py-2 px-3 bottom-2 rounded-xl text-text-light dark:text-text-dark hover:scale-[120%] transition-all duration-150'>
                                    <a target='blank' href={data.url}>Read More</a>
                                </button>

                            </div>
                        )
                    })
                ) : ''}

            </div>
        </div>
    )
}
