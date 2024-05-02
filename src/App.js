import React, { createContext,useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home" 

export const context = createContext({
  email: '',
  setEmail: () => {} 
})

const App = () => { 

  const [email,setEmail] = useState("")

  return (
    <context.Provider value={{email,setEmail}}>
      <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
    </context.Provider>
    
  )
}

export default App
