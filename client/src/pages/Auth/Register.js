import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bellologo from '../../assets/bello_logo.webp'
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="bodyclass">
  <div className="register-container">
    <div className="img-sec">
      <img src={bellologo} alt="logo" />
    </div>
    <div className="register-sec">
      <div className="title-sec">
        <h1 className="register-title">Register</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-data">
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required autoFocus />
            <label>Username</label>
          </div>
          <div className="input-data">
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <label>Email</label>
          </div>
          <div className="input-data">
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <label>Password</label>
          </div>
          <div className="input-data">
            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
            <label>Phone</label>
          </div>
          <div className="input-data">
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} required />
            <label>Address</label>
          </div>
          <div className="input-data">
            <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} required />
            <label>Security</label>
          </div>
           <div className="reg-btn">
          <button type="submit" className="regg-btn">Register</button>
            </div>
        </form>
      </div>
      
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Register;
