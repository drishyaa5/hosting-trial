import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios";  
import {useNavigate, useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import bellologo from '../../assets/bello_logo.webp'


const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  const location = useLocation();
  


  //form function
  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(`/api/v1/auth/login`,{email,password})
      if(res.data.success){
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data ))
        navigate(location.state||'/')
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  
  return (
    <Layout>
        <div className="bodyclass">
  <div className="register-container">
    <div className="img-sec">
      <img src={bellologo} alt="logo" />
    </div>
    <div className="register-sec">
      <div className="title-sec">
        <h1 className="register-title">Login</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="input-data">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required autoFocus />
            <label>Email</label>
          </div>
          <div className="input-data">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
           <div className="reg-btn">
          <button type="submit" className="regg-btn">Login</button>
            </div>
        </form>
        
      </div>
      
    </div>
  </div>
</div>
    </Layout>
  )
}

export default Login
