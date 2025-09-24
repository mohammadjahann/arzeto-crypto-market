import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function News() {

    const [newsData, setNewsData] = useState()
    const [showingNews, setShowingNews] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageArray, setPageArray] = useState()
    const showNumber = 9

    useEffect(() => {

        const definePagination = (data) => {
            let pageNum = Math.ceil(data.length / showNumber)
            let numbersArray = []
            for (let i = 1; i <= pageNum; i++) {
                numbersArray.push(i)
            }
            setPageArray(numbersArray)

        }

        const defineFirstShowing = (data) => {

            let endIndex = currentPage * showNumber
            let startIndex = endIndex - showNumber
            let showing = data.slice(startIndex, endIndex)

            setShowingNews(showing)



        }

        const fetchNews = async () => {
            console.log("📡 شروع fetch از Supabase...");

            const { data, error } = await supabase
                .from("news")
                .select("*")


            if (error) {
                console.error("❌ خطا در گرفتن دیتا:", error);
            } else {

                console.log(data);
                setNewsData(data)
                definePagination(data)
                defineFirstShowing(data)

            }
        };



        fetchNews();
    }, [currentPage])

    const pageButtons = () => {
        let active = currentPage
        let start = Math.max(1, active - 1)
        let end = Math.min(pageArray.length, active + 1)
        let render = []

        // Render firt buttom always

        if (start > 1) {
            render.push(
                <button
                    name={1}
                    onClick={(e) => { setCurrentPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`py-2 px-3  ${currentPage == 1 ? ' bg-blue-600 text-white' : 'bg-blue-400'}`}>
                    1
                </button>)
            if (start > 2) {
                render.push(<span className=' dark:text-white'>...</span>)
            }
        }

        // Render Middle

        for (let i = start; i <= end; i++) {
            render.push(
                <button
                    name={i}
                    onClick={(e) => { setCurrentPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`py-2 px-3  ${currentPage == i ? ' bg-blue-600 text-white' : 'bg-blue-400'}`}>
                    {i}
                </button>)

        }

        // Render last bitton always 

        if (end < pageArray.length) {
            if (end < pageArray.length - 1) {
                render.push(<span className=' dark:text-white'>...</span>)
            }
            render.push(
                <button
                    name={pageArray.length}
                    onClick={(e) => { setCurrentPage(pageArray.length); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`py-2 px-3  ${currentPage == pageArray.length ? ' bg-blue-600 text-white' : 'bg-blue-400'}`}>
                    {pageArray.length}
                </button>)
        }

        return render
    }

    const gettingword = (content) => {
        if (!content) return "";
        let allWords = content.split(" ");
        let selectWords = allWords.slice(0, 10);
        return `${selectWords.join(" ")} ...`;
    };

    return (
        <div className=' flex flex-col items-center min-h-[90vh]'>
            <h1 className=' text-text-light dark:text-text-dark mt-4 font-bold text-2xl'>:اخبار حوزه ارز دیجیتال</h1>
            <div className="bg-secondary-light dark:bg-secondary-dark flex flex-wrap items-center justify-around py-5 mx-auto max-w-[80%] rounded-xl my-1">
                {showingNews ? showingNews.map(data => {
                    return <div
                        className="h-[60vh] w-[95%] sm:w-[49%] lg:w-[32%] lg:h-[60vh] flex flex-col items-center   
                                 bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                                   transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
                                 hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
                                 hover:from-green-400 hover:to-emerald-600 overflow-hidden relative"
                        key={uuidv4()}>
                        <img
                            className=" w-full h-[50%] object-cover"
                            src={data.image_url}
                            alt="image" />
                        <h1 className=" h-12 overflow-hidden font-bold text-xl text-center mt-2 text-text-light dark:text-text-dark">
                            {data.title}
                        </h1>
                        <p className="mt-2 text-text-light dark:text-text-dark">
                            {gettingword(data.description)}
                        </p>
                        <button
                            className=" absolute bg-secondary-light dark:bg-secondary-dark py-2 px-3 bottom-2 rounded-xl text-text-light dark:text-text-dark hover:scale-[120%] transition-all duration-150"
                        >
                            <a target="_blank" href={data.url}>
                                Read More
                            </a>
                        </button>

                    </div>
                }) : 'Loading'}




            </div>
            {/* Pagination */}
            <div className='  rounded-lg overflow-hidden'>
                {pageArray ? pageButtons()
                    : ''}

            </div>
        </div>
    )
}

// pageArray.map((page, index) => (
//     <button
//         key={index}
//         name={page}
//         onClick={(e) => { setCurrentPage(e.target.name); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
//         className={`py-2 px-3  ${currentPage == page ? ' bg-blue-600 text-white' : 'bg-blue-400'}`}>
//         {page}
//     </button>
// ))