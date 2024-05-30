import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import "./quiz.css";
function AttemptQz() {
    const {id} = useParams();
    const [allques,setAllques] = useState([]);
    const [quizdata , setQuiz] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch quiz data
          const quizResult = await axios.get(`http://127.0.0.1:8000/quiz/getquiz/${id}`);
          setQuiz(quizResult.data);
    
          // Fetch all questions concurrently using Promise.all
          const questionPromises = quizResult.data.questions.map(async (questionId) => {
            const response = await axios.get(`http://127.0.0.1:8000/ques/getques/${questionId}`);
            return response.data;
          });
    
          // Wait for all question promises to resolve
          const allQuestions = await Promise.all(questionPromises);
    
          // Set the array of questions
          setAllques(allQuestions);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [id]);
    
    console.log(quizdata);
    console.log(allques);
    
    

    const [answers, setAnswers] = useState({});
  
    const handleAnswerSelect = (questionId, selectedAnswer) => {
      setAnswers({ ...answers, [questionId]: selectedAnswer });
    };
  
    const handleSubmit = () => {
      console.log('User Answers:', answers);
      // You can add further processing logic here
    };


  return (
<div className="quiz-container">
      <h2>Quiz Form</h2>
      <form>
        {allques.map((question) => (
          <div key={question[0].id} className="question-container">
            <p>{question[0].question}</p>
            <ul>
              {question[0].options.map((option) => (
                <li key={option}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${question[0].id}`}
                      value={option}
                      onChange={() => handleAnswerSelect(question[0].id, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AttemptQz
