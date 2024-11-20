import "./Game.css";
import back from "../images/back.svg";
import bananaimg from "../images/bananaAPIimg.svg";
import rankingbtn from "../images/rankingbtn.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Game = () => {
  const location = useLocation();
  const { timer } = location.state || { timer: 30 }; // Default to 30 seconds if not provided

  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="container-game">
        <div className="header-back-game">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>
        <div className="game">
          <div className="header-game">
            <h1>Banana Rush</h1>
            <h3>username</h3>
          </div>
          <div className="bananaAPI">
            <p className="timer">{formatTime(timeLeft)}</p>
            <img src={bananaimg} alt="API-img" />
            <p className="answer">Correct / wrong</p>
          </div>
        </div>
        <div className="score-container-main">
          <div className="score-container">
            <div className="left-content">
              <div className="number-input">
                <p>Enter the banana number : </p>
                <input
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>
              <span>
                <p>Total points : </p>
                <p className="points"></p>
              </span>
              <span>
                <p>Time taken : </p>
                <p className="time"></p>
              </span>
            </div>
            <div className="right-content">
              <button className="rankbtn">
                <img src={rankingbtn} alt="rankbtn" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-game">
        <p>V1.0</p>
        <p>made by : Sabique</p>
      </div>
    </>
  );
};
