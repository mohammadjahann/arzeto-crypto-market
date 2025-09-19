import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function NewsSection() {
    const [topNews, setTopNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            console.log("📡 شروع fetch از Supabase...");

            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("published_at", { ascending: false })
                .limit(3);

            if (error) {
                console.error("❌ خطا در گرفتن دیتا:", error);
            } else {
                
                setTopNews(data);
            }
        };

        fetchNews();
    }, []);

    const gettingword = (content) => {
        if (!content) return "";  // اگه خالی یا null بود، چیزی برنگردونه
        let allWords = content.split(" ");
        let selectWords = allWords.slice(0, 10);
        return `${selectWords.join(" ")} ...`;
    };
    return (
        <div className="bg-secondary-light dark:bg-secondary-dark flex flex-col  items-center justify-center py-5 mx-auto max-w-[80%] rounded-xl my-5">
            <p className=" mt-2 font-bold text-text-light dark:text-text-dark text-[15px] sm:text-[20px]">
                : آخرین اخبار
            </p>
            <div className=" flex w-full justify-around items-center flex-wrap ">
                {topNews.length > 0 ? (
                    topNews.map((news) => (
                        <div
                            className="h-[80vh] w-[70%] sm:w-[45%] lg:w-[30%] lg:h-[60vh] flex flex-col items-center   
              bg-primary-light dark:bg-primary-dark rounded-2xl shadow-lg mt-4 
                transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl 
              hover:shadow-green-400/40 hover:border-2 hover:border-gradient-to-r 
              hover:from-green-400 hover:to-emerald-600 overflow-hidden relative"
                            key={news.id}
                        >
                            <img
                                className=" w-full h-[50%] object-cover"
                                src={news.image_url}
                                alt="image"
                            />
                            <h1 className=" font-bold text-xl text-center mt-2 text-text-light dark:text-text-dark">
                                {news.title}
                            </h1>
                            <div>
                                <p className="mt-2 text-text-light dark:text-text-dark">
                                    {gettingword(news.description)}
                                </p>
                            </div>
                            <button
                                className=" absolute bg-secondary-light dark:bg-secondary-dark py-2 px-3 bottom-2 rounded-xl text-text-light dark:text-text-dark hover:scale-[120%] transition-all duration-150"
                            >
                                <a target="_blank" href={news.url}>
                                    Read More
                                </a>
                            </button>
                        </div>
                    ))
                ) : (
                    <h1>loading...</h1>
                )}
            </div>
        </div>
    );
}
