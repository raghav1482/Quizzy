import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./quiz.css"
function CreateQuiz() {
    const usr = JSON.parse(localStorage.getItem("User"));

    const [quiz,setquiz] = useState({title:"" , questions:[],creator:""});
    const [ques , setQues] = useState({title:"" , o1:"" , o2:"" , o3:"" , o4:"" , ans:""});
    const [qno,setqno] = useState(1);
    const [qarr,setqarr] = useState([]);
    const [q,setQ] = useState({question:"",options:[],ans:"",creator:""});

    const handleChange = (e)=>{
        setQues((prev)=>({...prev , [e.target.name]:e.target.value}));
        setQ({question:ques.title,options:[ques.o1,ques.o2,ques.o3,ques.o4],ans:ques.ans,creator:`${usr.email}`});
    }
    
    const handleAddmore = async (e)=>{
        e.preventDefault();
        setqno(qno + 1);
        await axios.post("http://127.0.0.1:8000/api/v1/ques/addques",q).then((result)=>{console.log(result);setqarr((prev) => [...prev, result.data._id]);}).catch(e=>{console.log(e)});
        // setqarr((prev) => [...prev, qid]);
        setQues({ title: "", o1: "", o2: "", o3: "", o4: "", ans: "" });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedQuiz = { ...quiz,creator:`${usr.email}`, questions: qarr }; // Create a new object with updated questions
        setquiz(updatedQuiz);
          await axios.post("http://127.0.0.1:8000/api/v1/quiz/addquiz", updatedQuiz).then((result)=>{setquiz({title:"" , questions:[],creator:""});setqno(1);}).catch(e=>console.log(e));
      }

      
      

  return (
    <div>
      <div className="container" style={{margin:"100px auto" , background:"white" , borderRadius:"20px" , padding:"30px"}}>
    <h2>Create Quiz</h2>
    <form>
        <div className="form-group quiz">
            <label htmlFor="quizTitle"></label>
            <input type="text" className="form-control" id="quizTitle" onChange={(e)=>{setquiz((prevQuiz) => ({
      ...prevQuiz,
      title: e.target.value,
    }))}} value={quiz.title} placeholder="Enter quiz title" required/>
        </div>

        {/* QUESTION */}

        <div className="form-group d-flex question" >
            <label htmlFor="questionTitle">Q{qno}:</label>
            <input type="text" className="form-control" id="questionTitle" onChange={(handleChange)} name="title" value={ques.title} placeholder="Enter question" required/>
        </div>
        <div className="form-group d-flex option">
            <label htmlFor="option1">(i)</label>
            <input type="text" className="form-control" id="option1" onChange={handleChange} name="o1" value={ques.o1} placeholder="Enter option 1" required/>
        </div>
        <div className="form-group d-flex option">
            <label htmlFor="option2">(ii)</label>
            <input type="text" className="form-control" id="option2" onChange={handleChange} name="o2" value={ques.o2} placeholder="Enter option 2" required/>
        </div>
        <div className="form-group d-flex option">
            <label htmlFor="option3">(iii)</label>
            <input type="text" className="form-control" id="option3" onChange={handleChange} name="o3" value={ques.o3} placeholder="Enter option 3" required/>
        </div>
        <div className="form-group d-flex option">
            <label htmlFor="option4">(iv)</label>
            <input type="text" className="form-control" id="option4" onChange={handleChange} name="o4" value={ques.o4} placeholder="Enter option 4" required/>
        </div>
        <div className="form-group d-flex option">
            <label htmlFor="option4">Answer</label>
            <input type="text" className="form-control" id="correct" onChange={handleChange} name="ans" value={ques.ans} placeholder="answer" required/>
        </div>

        <button type="submit" className="btn btn-primary addmore" onClick={handleAddmore}>Add More</button>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
</div>

    </div>
  )
}

export default CreateQuiz;
