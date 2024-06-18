import React from "react";
import "../Footer/Footer.style.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerInfo">
        <img src="https://res.kurly.com/pc/ico/1810/ico_instagram.png" alt="" />
        <img src="https://res.kurly.com/pc/ico/1810/ico_fb.png" alt="" />
        <img src="https://res.kurly.com/pc/ico/1810/ico_blog.png" alt="" />
        <img src="https://res.kurly.com/pc/ico/1810/ico_naverpost.png" alt="" />
        <img src="https://res.kurly.com/pc/ico/1810/ico_youtube.png" alt="" />
      </div>
      <div className="company">
        <p>주식회사 : 냉장고에 뭐 있어?</p>
      </div>
      <div className="footerCopyright">
        &copy; 2024 What’s in your frige. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
