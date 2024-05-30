import React from 'react'
import "./quiz.css";
import { useNavigate } from 'react-router-dom';


function Quizcard({id,name , creator , ques }) {
    const nav = useNavigate();
    // console.log(key);
    const handleClick = (e)=>{
        nav(`/quiz/${id}`);
    }

  return (
    <div className="card">
        <div className="overlay"></div>
        <h2>{name.toUpperCase()}</h2>
        <div className="glass-effect details">
            <p>Creator: {creator}</p>
            <p>Number of Questions: {ques}</p>
        </div>
        <a  className="start-button" onClick={handleClick}>Start Quiz</a>
    </div>
  )
}

export default Quizcard
