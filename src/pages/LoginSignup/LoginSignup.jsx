import "./LoginSignup.css";
import back from "../images/back.svg";
import bananapixelart from "../images/banana-pixel-art.svg";
import { Link } from "react-router-dom";

export const LoginSignup = () => {
  return (
    <>
      <div className="container">
        <div className="header-back">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="hero-section">
          <div className="hero-text">
            <h1>BANANA RUSH</h1>
          </div>
          <div className="banana-line">
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
            <img className="spin" src={bananapixelart} alt="" />
          </div>
        </div>
        <div className="play-button2">
          <Link to="/login">LOGIN</Link>
          <Link to="/signup">SIGN UP</Link>
          {/* <Link>PLAY AS A GUEST</Link> */}
        </div>
        {/* <div className="play-btn-text">
          <p>Solve the banana quiz to gain more points and climb the rank </p>
        </div> */}
        <div className="footer">
          <p>V1.0</p>
          <p>made by : Sabique</p>
        </div>

        {/* <p>Copyright © 2022 BANANA RUSH. All rights reserved.</p> */}
      </div>
    </>
  );
};
