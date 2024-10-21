import React from 'react'
import PopularCategories from '../components/PopularCategories'
import RecentlyAddedSection from '../components/Home/RecentlyAddedSection'

export default function Home() {
  
  return (
    <div>
      <RecentlyAddedSection />
      <PopularCategories />
    </div>
  )
}
