import React,{useState,useContext} from 'react' 
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { context } from '../../App'
import "./index.css"

const Login = () => { 
    const { email, setEmail } = useContext(context);
    const [password,setPassword] = useState("")  
    const [error,setError] = useState("") 
    const [isError,setIsError] = useState(false)


    const navigate = useNavigate()

    const loginSuccess = jwtToken=>{
      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      Cookies.set("jwt_token",jwtToken,{expires:expirationDate}) 
      navigate("/")
      setPassword("")
      setIsError(false)
    }
   
    const loginFailure = errMsg=>{
        setError(errMsg)
        setIsError(true)
    }


    const userLogin = async(e)=>{
         e.preventDefault() 
         const jwt_token = Cookies.get("jwt_token")
         try{
            const url = "http://localhost:9000/login" 
            const options = {
               method:"POST",
               headers: {
                   "Content-Type": "application/json",
                   Authorization: `Bearer ${jwt_token}`
               },
               body:JSON.stringify({email,password}) 
            } 
            const response = await fetch(url ,options) 
            const data = await response.json() 
            if(response.ok){
                loginSuccess(data.jwt_token)
            }else{
              loginFailure(data.error)
            }
            console.log(data) 
         }catch(error){
            console.log("Error:",error)
         }
         
    }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="login-card">
          <img src="https://i.ibb.co/wQkd8Bf/Frame-274.png" alt="Frame-274"/>
            <h1 className="tasty-logo-head">Tasty Kitchens</h1>
            <h1 className="login">Login</h1>
        </div>
      <form onSubmit={userLogin}>
        <label htmlFor='email' className="label">Email</label> <br/>
        <input type="text" placeholder="Email" className="input" required onChange={(e)=>setEmail(e.target.value)} value={email} id="email"/> <br/>
        <label htmlFor='password' className="label">Password</label> <br/>
        <input type="password" placeholder="Password" className="input" required onChange={(e)=>setPassword(e.target.value)} value={password} id="password"/> <br/>
        <button type="submit">Login</button>
        {isError && <p className="error">*{error}</p>} 
        <p className="account-p">Dont have an account? <Link to="/register">Register</Link></p>
      </form>
      </div>
    </div>
  )
}

export default Login
