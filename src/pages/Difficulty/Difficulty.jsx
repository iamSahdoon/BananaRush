import "./Difficulty.css";
import back from "../images/back.svg";
import diff1 from "../images/diff1.svg";
import diff2 from "../images/diff2.svg";
import diff3 from "../images/diff3.svg";
import { Link } from "react-router-dom";

export const Difficulty = () => {
  return (
    <>
      <div className="container">
        <div className="header-back-diff">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="mid-section">
          <h1>Difficulty</h1>
        </div>

        <div className="diff-section">
          <Link to="/thegame">
            <button>
              <img src={diff1} alt="difficulty1" />
            </button>
          </Link>
          <Link to="/thegame">
            <button>
              <img src={diff2} alt="difficulty2" />
            </button>
          </Link>
          <Link to="/thegame">
            <button>
              <img src={diff3} alt="difficulty3" />
            </button>
          </Link>
          <div className="footer">
            <p>V1.0</p>
            <p>made by : Sabique</p>
          </div>
        </div>
      </div>
    </>
  );
};
