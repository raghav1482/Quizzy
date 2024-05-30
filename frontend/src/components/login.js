// LoginForm.js

import React, { useEffect, useState } from 'react';
import google from "../images/google.png"
import './login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useUserContext } from './UserContext';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {app} from "../firebase"
const LoginForm = () => {
  const [frmdata , setFrmdata] = useState({email:"" , password:""});
  const auth = getAuth();
  const nav = useNavigate();
  const {isLogin , login , logout} = useUserContext();
  const handleChange = (e)=>{
    setFrmdata((prev)=>({...prev , [e.target.name]:e.target.value}));
  }
  console.log(frmdata);
  const provider = new GoogleAuthProvider();
  const handleSubmit = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, frmdata.email, frmdata.password);
        const user = userCredential.user;
        localStorage.setItem("User", JSON.stringify(user));

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/register", {
                email: frmdata.email,
                password: frmdata.password
            });
            console.log(response);
        } catch (error) {
            console.error("Error registering user:", error);
        }

        login();
        nav("/");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("User", JSON.stringify(user));

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/register", {
                email: user.email,
                password: user.uid,
                username:user.displayName,
                image:user.photoURL
            });
            console.log(response);
        } catch (error) {
            console.error("Error registering user:", error);
        }

        login();
        nav("/");
    } catch (error) {
        alert("Error: " + error.message);
    }
};

  return (
    <div className="login-form back">
      <h2>Login</h2>
      <div className="form-group d-flex">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={frmdata.email} onChange={handleChange} placeholder="Enter your email" />
      </div>
      <div className="form-group d-flex">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={frmdata.password} onChange={handleChange} placeholder="Enter your password" />
      </div>
      <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
        <button className="login-button m-2" onClick={handleSubmit}>Login</button>
        <button className="login-button m-2" onClick={handleGoogleLogin}><img src={google} style={{width:"20px"}} className='mx-2'/>Sign in with Google</button>
      </div>
      <Link to="/register">Register Now</Link>
    </div>
  );
};

export default LoginForm;
