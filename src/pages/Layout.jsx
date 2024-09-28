import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Layout() {
  let [userToken, setUserToken] = useState(null)

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
