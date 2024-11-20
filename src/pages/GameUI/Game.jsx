import "./Game.css";
import back from "../images/back.svg";
import rankingbtn from "../images/rankingbtn.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Game = () => {
  const location = useLocation();
  const { timer } = location.state || { timer: 30 }; // Default to 30 seconds if not provided

  const [timeLeft, setTimeLeft] = useState(timer);
  const [questionImage, setQuestionImage] = useState(null); // Holds the quiz image URL
  const [solution, setSolution] = useState(null); // Holds the solution from the API
  const [loading, setLoading] = useState(true); // Track API loading state
  const [userAnswer, setUserAnswer] = useState(""); // Holds the user's input
  const [feedback, setFeedback] = useState(""); // Holds feedback (Correct/Wrong)

  // Timer countdown
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

  // Fetch the quiz question from the API
  const fetchQuestion = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await fetch("https://marcconrad.com/uob/banana/api.php");
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
      setTimeLeft(timer); // Reset the timer for the next question
      setFeedback(""); // Reset feedback to initial state
    } catch (error) {
      console.error("Failed to fetch API:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch the first quiz question on component mount
  useEffect(() => {
    fetchQuestion();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = () => {
    if (!userAnswer) {
      setFeedback("Please enter a number!"); // Feedback for empty input
      return;
    }

    if (parseInt(userAnswer, 10) === solution) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback("Wrong! 😞");
    }

    setUserAnswer(""); // Clear the input field after submission

    // Delay before moving to the next quiz
    setTimeout(() => {
      fetchQuestion(); // Fetch the next quiz question
    }, 2000); // 2-second delay
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
            {loading ? (
              <p>Loading...</p>
            ) : (
              <img src={questionImage} alt="Quiz Question" />
            )}
            <p className="answer">{feedback}</p>
          </div>
        </div>
        <div className="score-container-main">
          <div className="score-container">
            <div className="left-content">
              <div className="number-input">
                <p>Enter the banana number: </p>
                <input
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={userAnswer}
                  onChange={(e) =>
                    setUserAnswer(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <button className="user-input-submit" onClick={handleSubmit}>
                  SUBMIT
                </button>
                <button className="user-input-next">Next Quiz</button>
              </div>
              <span>
                <p>Total points: </p>
                <p className="points"></p>
              </span>
              <span>
                <p>Time taken: </p>
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
