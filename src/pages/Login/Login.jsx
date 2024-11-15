import "./Login.css";
import back from "../images/back.svg";
import { Link } from "react-router-dom";
import tosignup from "../images/tosignup.svg";
import play from "../images/play.svg";

export const Login = () => {
  return (
    <>
      <div className="container">
        <div className="header-back-login">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <h1>Login</h1>
        </div>

        <div className="box-container">
          <div className="box">
            <form>
              <input
                className="username"
                type="text"
                placeholder="Username..."
              />
              <input
                className="password"
                type="password"
                placeholder="Password..."
              />
            </form>
            <div className="img-container">
              <Link to="/signup">
                <img className="tosignup" src={tosignup} alt="siginup" />
              </Link>
              <Link to="/difficulty">
                <img className="play" src={play} alt="play" />
              </Link>
            </div>
          </div>
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
