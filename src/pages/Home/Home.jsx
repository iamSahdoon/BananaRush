import "./Home.css";
import InfoIcon from "../images/info.svg";
import bananapixelart from "../images/banana-pixel-art.svg";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="container">
        <div className="header-icon">
          <img src={InfoIcon} alt="Banana Login Signup" />
          <div className="old-user-container">
            <h1 className="user-name">username</h1>
            <button className="logout">Logout</button>
          </div>
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
        <div className="play-button">
          {/* <a href="#">PLAY</a> */}
          <Link to="/Login">PLAY</Link>
        </div>
        <div className="play-btn-text">
          <p>Solve the banana quiz to gain more points and climb the rank </p>
        </div>
        <div className="footer">
          <p>V1.0</p>
          <p>made by : Sabique</p>
        </div>

        {/* <p>Copyright © 2022 BANANA RUSH. All rights reserved.</p> */}
      </div>
    </>
  );
};
