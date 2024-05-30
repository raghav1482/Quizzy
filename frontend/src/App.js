import logo from './logo.svg';
import './App.css';
import CreateQuiz from './components/createqz';
import HomePage from './components/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login';
import Navbar from './components/navbar';
import Quizes from './components/quiz';
import AboutUs from './components/Aboutus';
import RegForm from './components/signup';
import Aos from "aos";
import AttemptQz from './components/AttemptQz';
import { useEffect } from 'react';
import Footer from './components/Footer';
function App() {
  useEffect(()=>{
    Aos.init();
  },[]);
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginForm/>}></Route>
        <Route path="/quizes/createquiz" element={<CreateQuiz/>}></Route>
        <Route path="/quiz/:id" element={<AttemptQz/>}></Route>
        <Route path="/quizes" element={<Quizes/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/register" element={<RegForm/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
