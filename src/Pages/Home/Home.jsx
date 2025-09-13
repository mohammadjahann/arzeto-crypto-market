import React from 'react'
import HeroSection from './Components/HeroSection'
import HomeChart from './Components/HomeChart'
import TopTrending from './Components/TopTrending'
import TopCoins from './Components/TopCoins'
import NewsSection from './NewsSection'

export default function Home() {
  return (
    <div>
        <HeroSection/>
        <HomeChart/>
        <TopTrending/>
        <TopCoins/>
        <NewsSection/>
    </div>
  )
}
