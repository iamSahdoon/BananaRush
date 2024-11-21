import "./Game.css";
import back from "../images/back.svg";
import rankingbtn from "../images/rankingbtn.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/config"; // Firebase services
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions

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
  const [points, setPoints] = useState(0); // State to store user points
  const [isPaused, setIsPaused] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [calculationTime, setCalculationTime] = useState(null); // State to store calculation time

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userUid = user.uid; // Get the UID from the logged-in user
            const userDocRef = doc(database, "users", userUid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUsername(userData.username || "Unknown User");
              setPoints(userData.points || 0); // Fetch initial points
            } else {
              console.log("User document does not exist");
              setUsername("Unknown User");
              setPoints(0); // Default points if user document is missing
            }
          } else {
            setUsername("Guest");
            setPoints(0); // Default points for guests
          }
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error fetching username");
        setPoints(0); // Handle error case
      }
    };

    fetchUserData(); // Call the function
  }, []);

  const incrementPoints = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userUid = user.uid;
        const userDocRef = doc(database, "users", userUid);

        const newPoints = points + 10; // Increment points by 10
        await updateDoc(userDocRef, { points: newPoints }); // Update Firestore
        setPoints(newPoints); // Update state
      }
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

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
      incrementPoints(); // Increment points in Firebase
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
        <div className="spinner">
          <img src="" alt="spinner" />
          <img src="" alt="spinner" />
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
              <span className="point-container">
                <p>Total points: </p>
                <p className="points">{points}</p> {/* Display points */}
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
