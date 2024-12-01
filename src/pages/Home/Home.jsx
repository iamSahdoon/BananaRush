import "./Home.css";
import InfoIcon from "../../assets/images/info.svg";
import bananapixelart from "../../assets/images/banana-pixel-art.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/config"; // Import Firebase services
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { signOut } from "firebase/auth"; // Import Firebase signOut function

export const Home = () => {
  const [username, setUsername] = useState("Fetching..."); // State to hold the username
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Fetch username and authentication state
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userUid = user.uid; // Get current user's UID
            const userDocRef = doc(database, "users", userUid); // Reference Firestore document
            const userDoc = await getDoc(userDocRef); // Fetch the document

            if (userDoc.exists()) {
              setUsername(userDoc.data().username); // Set the username from Firestore data
            } else {
              console.log("User document does not exist");
              setUsername("Unknown User");
            }
            setIsLoggedIn(true); // Mark as logged in
          } else {
            setUsername("Guest"); // Handle case where no user is logged in
            setIsLoggedIn(false); // Mark as not logged in
          }
        });

        return () => unsubscribe(); // Clean up the listener when the component unmounts
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("Error fetching username");
      }
    };

    fetchUsername(); // Call the function on component mount
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user from Firebase
      setUsername("Guest"); // Reset username state
      setIsLoggedIn(false); // Set login status to false
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header-icon">
          <Link to="/details">
            <img src={InfoIcon} alt="Banana Login Signup" />
          </Link>
          <div className="old-user-container">
            <h1 className="user-name">{username}</h1>{" "}
            {/* Display the username */}
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>{" "}
            {/* Logout button */}
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-text">
            <p>BANANA RUSH</p>
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
          {/* Conditionally change the link based on login status */}
          <Link to={isLoggedIn ? "/difficulty" : "/LoginSignup"}>PLAY</Link>
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
