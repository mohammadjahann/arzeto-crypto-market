import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function HeroSection() {

   

    return (
        <div
            style={{
                backgroundImage: `url('./img/bitcoin.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className='group relative flex items-center justify-center mx-auto max-w-[80%] rounded-xl my-5 h-[80vh]'>

            <div className='absolute inset-0 bg-black/50 rounded-xl transition-all duration-300 group-hover:bg-black/80'></div>

            <div className='relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4'>

                <p className=' text-sm md:text-lg lg:text-2xl mb-2'>با حرفه ای ترین ،پر سابقه ترین ، کاربد ترین متخصصین ما</p>

                <TypeAnimation
                    sequence={[
                        'بهترین سرمایه گذاری',
                        1000,
                        'بهترین تحلیل',
                        1000,
                        'بهترین پشتیبانی',
                        1000,
                    ]}
                    speed={50}
                    className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-5 rtl"
                    style={{ direction: "rtl" }}
                    repeat={Infinity}
                />

                <button className="rounded-2xl bg-[#38E07B] px-3 py-2 shadow-[0px_0px_30px_1px_#BAFFC2]">
                    دریافت مشاوره
                </button>
            </div>
        </div>
    );
}