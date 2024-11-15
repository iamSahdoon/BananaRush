import "./Signup.css";
import back from "../images/back.svg";
import { Link } from "react-router-dom";
import tologin from "../images/tologin.svg";
import register from "../images/register.svg";

export const Signup = () => {
  return (
    <>
      <div className="container">
        <div className="header-back-signup">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <h1>Sign up</h1>
        </div>

        <div className="box-container">
          <div className="box">
            <form>
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
              />
              <input
                className="password"
                type="password"
                name="name"
                id="email"
                placeholder="Password..."
              />
            </form>
            <div className="img-container">
              <Link to="/loginSection">
                <img className="tosignup" src={tologin} alt="siginup" />
              </Link>
              <button type="submit">
                <img className="play" src={register} alt="play" />
              </button>
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
