import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./index.css"

const Register = () => { 
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [isError,setIsError] = useState(false) 
    const [error,setError] = useState("")

    const navigate = useNavigate()

    const registerSuccess = ()=>{
         navigate("/login")
         setError(false)
    }

    const registerFailed = err=>{
          setError(err) 
          setIsError(true)
    }

    const userRegister = async(e)=>{
      e.preventDefault() 
      const url = "http://localhost:9000/register" 
      const options = {
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({username,email,password})
      } 

      const response = await fetch(url,options) 
      const data = await response.json() 
      if(response.ok){
        registerSuccess()
      }else{
        registerFailed(data.warning)
      }
      console.log(data)

    }

  return (
    <div className="form-container">
      <div className="form-card">
      <div className="login-card">
          <img src="https://i.ibb.co/wQkd8Bf/Frame-274.png" alt="Frame-274"/>
            <h1 className="tasty-logo-head">Tasty Kitchens</h1>
            <h1 className="login">Register</h1>
        </div>
     
      <form onSubmit={userRegister}>
      <label htmlFor='username' className="label">Username</label> <br/>
        <input type="text" placeholder="Username" className="input" required onChange={(e)=>setUsername(e.target.value)} value={username} id="username"/> <br/>
        <label htmlFor='email' className="label">Email</label> <br/>
        <input type="text" placeholder="Email" className="input" required onChange={(e)=>setEmail(e.target.value)} value={email} id="email"/> <br/>
        <label htmlFor='password' className="label">Password</label> <br/>
        <input type="password" placeholder="Password" className="input" required onChange={(e)=>setPassword(e.target.value)} value={password} id="password"/> <br/>
        <button type="submit">Register</button>
        {isError && <p className="error">*{error}</p>}
        <p className="account-p">Already have an account? <Link to="/login">Login</Link></p>
      </form>
      </div>
    </div>
  )
}

export default Register
