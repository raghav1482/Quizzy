import React, { useEffect, useState } from 'react'
import "./style.css"
import { useUserContext } from './UserContext'
import axios from "axios";
import Quizcard from './quizcard';
function Quizes() {
  const {isLogin} = useUserContext();
  const [allquizes,setAllqz]=useState([]);
  useEffect(()=>{
    const getallquizes = async()=>{
      await axios.get("http://127.0.0.1:8000/quiz/allquizes").then((result)=>{setAllqz(result.data)}).catch(e=>{console.log(e)});
    }
    getallquizes();
  },[]);
  return (
    <div className='back'>
      {isLogin && <a className='start-button' style={{marginTop:"100px"}} href='/quizes/createquiz'>Create Quiz</a>}
      <h4>Try some ...</h4>
      <div className='quizcont'>
        {allquizes.map((quiz)=>{return <Quizcard key={quiz._id} id={quiz._id} name={quiz.title} ques={quiz.questions.length} creator={quiz.creator?quiz.creator.name:"NULL"}/>})}
      </div>
    </div>
  )
}

export default Quizes
