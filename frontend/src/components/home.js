import React from 'react';
import './style.css';
import Navbar from './navbar';
import { useUserContext } from './UserContext';
import heroimg from "../images/hero.png"
const HomePage = () => {
  const {isLogin} = useUserContext();
  const userdat = JSON.parse(localStorage.getItem("User"));
  // console.log(isLogin);
  return (
    <div className="home-page-wrapper back">
      <div style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
      <div className='hero'>
        <h1 className="title">Hi {userdat?userdat.displayName: "Buddy"}</h1>
        <h2 className="subtitle">Study 10x faster with AI quizzes</h2>
        <a href="/quiz" className="start-button">Start Studying Faster</a>
      </div>
        <img src={heroimg} className='hero-img'/>
        </div>
      <div className='test-div'>
          <h3 style={{fontSize:"20px",fontWeight:"600 !important",textAlign:"left",width:"100%"}}>Qizzy</h3>
          <div class="ques" data-aos="fade-up" data-aos-delay="300">What is the capital of France?</div>
          <ul class="choices">
              <li class="choice" data-aos="fade-right">A. Berlin</li>
              <li class="choice" data-aos="fade-right">B. Madrid</li>
              <li class="choice" data-aos="fade-right">C. Paris</li>
              <li class="choice" data-aos="fade-right">D. Rome</li>
          </ul>
          <a href="#" className="start-button nxt">Next</a>
      </div>
      <div className='stop-w-con'>
      <div className='stop-wasting'>
        <h3>Stop wasting time studying.</h3>
        <p>Join 2,000+ students crushing their exams. Start studying faster for free.</p>
        <a href="#" className="start-button">Start Learning Faster</a>
      </div>
      <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
        <div className='review-card'>
          <div><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
          <h4>Rohit Tiwari</h4>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        </div>
        <div className='review-card'>
          <div><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
          <h4>Rohit Tiwari</h4>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        </div>
        <div className='review-card'>
          <div><img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
          <h4>Rohit Tiwari</h4>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
