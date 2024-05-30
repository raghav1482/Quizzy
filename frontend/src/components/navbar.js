import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useUserContext } from './UserContext';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../firebase';

export default function Navbar(){
    const {isLogin , logout,login} = useUserContext();   
    const auth = getAuth();

    const usrdat = JSON.parse(localStorage.getItem("User"));
    if(usrdat){
        login();
    }
    else{
        logout();
    }

    const signuserout = ()=>{
      signOut(auth).then(()=>{logout();}).catch(e=>{alert("Error Signing out...:(")});
    }
    return(<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width:"100%"}}>
  <a className="navbar-brand mx-5 font-weight-bold" href="/" style={{fontSize:"25px"}}>Quizzy</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse flex-grow-0" id="navbarNav" style={{width:"100%"}}>
    <ul className="navbar-nav flex" style={{width:"100%",justifyContent:"space-between"}}>
      <div style={{display:"flex"}}> 
      <li className="nav-item">
        <a className="nav-link" href="/about">About</a>
      </li>
      {isLogin &&  <li className="nav-item">
        <a className="nav-link" href="/quizes">Quizes</a>
      </li>}
{isLogin &&  <li className="nav-item">
        <a className="nav-link" href="/results">Results</a>
      </li>}
      </div>
      <div>
{ isLogin && <li className="nav-item">
        <img src={`${usrdat.photoURL}`} className='profile-img' referrerpolicy="no-referrer"/>
        <a className="nav-link logout-nav" href="#" onClick={signuserout}>Logout</a>
      </li> }
{!isLogin &&  <li className="nav-item">
        <a className="nav-link" href="/login">Login/SignUP</a>
      </li>}
      </div>
    </ul>
  </div>
</nav>
    </>);
}