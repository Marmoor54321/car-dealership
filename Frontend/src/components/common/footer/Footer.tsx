import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>
            &copy; {currentYear} <strong>AutoDealer</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
