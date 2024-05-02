import React, {useState,useEffect } from 'react'
import Cookies from "js-cookie"

const Home = () => {
  const [offers,setOffers] = useState([]) 

  useEffect(()=>{
      const fetchingOffers = async()=>{
      const token = Cookies.get("jwt_token")
      const url = 'https://apis.ccbp.in/restaurants-list/offers' 
      const options = {
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      const response = await fetch(url,options) 
      const data = await response.json() 
      console.log(data)
      console.log(token)

    }
      fetchingOffers()
  },[])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
