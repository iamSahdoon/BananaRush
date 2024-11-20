import "./Game.css";
import back from "../images/back.svg";
import rankingbtn from "../images/rankingbtn.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/config"; // Import Firebase services
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

export const Game = () => {
  const location = useLocation();
  const { timer } = location.state || { timer: 30 }; // Default to 30 seconds if not provided

  const [username, setUsername] = useState("Fetching...");
  const [timeLeft, setTimeLeft] = useState(timer);
  const [questionImage, setQuestionImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [calculationTime, setCalculationTime] = useState(null); // State to store calculation time

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (auth.currentUser) {
          const userUid = auth.currentUser.uid;
          const userDocRef = doc(database, "users", userUid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          } else {
            console.log("User document does not exist");
            setUsername("Unknown User");
          }
        } else {
          setUsername("Guest");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("Error fetching username");
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || isPaused) return;

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, isPaused]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://marcconrad.com/uob/banana/api.php");
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
      setTimeLeft(timer);
      setFeedback("");
      setIsPaused(false);
      setCanProceed(false);
      setCalculationTime(null); // Reset calculation time for the next quiz
    } catch (error) {
      console.error("Failed to fetch API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSubmit = () => {
    if (!userAnswer) {
      setFeedback("Please enter a number!");
      return;
    }

    if (parseInt(userAnswer, 10) === solution) {
      setFeedback("Correct! 🎉");
      setIsPaused(true);
      setCanProceed(true);
      setCalculationTime(timer - timeLeft); // Calculate and set the calculation time
    } else {
      setFeedback("Wrong! 😞");
    }

    setUserAnswer("");
  };

  const handleNextQuiz = () => {
    if (!canProceed) {
      setFeedback("Answer this quiz first to unlock the next quiz.");
      return;
    }
    setFeedback("");
    fetchQuestion();
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
            <p>{username}</p>
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
                <button className="user-input-next" onClick={handleNextQuiz}>
                  Next Quiz
                </button>
              </div>
              <span>
                <p>Total points: </p>
                <p className="points"></p>
              </span>
              <span className="calculation">
                <p>Your calculation time: </p>
                <p className="time">
                  {calculationTime !== null
                    ? `${calculationTime} seconds`
                    : "N/A"}
                </p>
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
