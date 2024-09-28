import React from 'react'
import RecentlyAddedProducts from '../components/RecentlyAddedProducts'
import PopularCategories from '../components/PopularCategories'

export default function Home() {
  return (
    <div>
      <RecentlyAddedProducts />
      <PopularCategories />
    </div>
  )
}
