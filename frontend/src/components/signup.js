// LoginForm.js

import React, { useContext, useState } from 'react';
import google from "../images/google.png"
import { useUserContext } from './UserContext';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import axios from 'axios';
import  {app} from "../firebase"

const RegForm = () => {
  const [regdata , setRegdata] = useState({name:"" , email:"" , password:""});
  const nav = useNavigate();
  const {isLogin , login , logout} = useUserContext();
  const handleChange=(e)=>{
    setRegdata((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const auth = getAuth();
  const provider=new GoogleAuthProvider();

  const signupusr = async()=>{
    createUserWithEmailAndPassword(auth,regdata.email,regdata.password).then((value)=>{console.log(value)});
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/register", {
            email: regdata.email,
            password: regdata.password,
            username:regdata.name
        });
        console.log(response);
    } catch (error) {
        console.error("Error registering user:", error);
    }
  }
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
      <h2>SignUp</h2>
      <div className="form-group d-flex">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name='name' onChange={handleChange} value={regdata.name} placeholder="Enter your name" />
      </div>
      <div className="form-group d-flex">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name='email' value={regdata.email} onChange={handleChange} placeholder="Enter your email" />
      </div>
      <div className="form-group d-flex">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password' value={regdata.password} onChange={handleChange} placeholder="Enter your password" />
      </div>
      <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
        <button className="login-button" onClick={signupusr}>Register</button>
        <button className="login-button m-2" onClick={handleGoogleLogin}><img src={google} style={{width:"20px"}} className='mx-2'/>Sign up with Google</button>
      </div>
      <Link to="/login">Have Account-Login</Link>
    </div>
  );
};

export default RegForm;
