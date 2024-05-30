import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h4 className="footer-title" style={{ color: "white" }}>Quizzy</h4>
        <a href="/quiz" className="start-button">Start Studying Faster</a>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h5 className="footer-heading">Pages</h5>
          <ul className="footer-list">
            <li>About Us</li>
            <li>Quizes</li>
            <li>Results</li>
          </ul>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Links</h5>
          <ul className="footer-list">
            <li>Sign in</li>
            <li>Linked in</li>
          </ul>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Legal</h5>
          <ul className="footer-list">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
