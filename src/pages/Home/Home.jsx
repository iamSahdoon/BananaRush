import "./Home.css";
import InfoIcon from "../images/info.svg";
import bananapixelart from "../images/banana-pixel-art.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, database } from "../../firebase/config"; // Import Firebase services
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

export const Home = () => {
  const [username, setUsername] = useState("Fetching..."); // State to hold the username

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
          } else {
            setUsername("Guest"); // Handle case where no user is logged in
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

  return (
    <>
      <div className="container">
        <div className="header-icon">
          <img src={InfoIcon} alt="Banana Login Signup" />
          <div className="old-user-container">
            <h1 className="user-name">{username}</h1>{" "}
            {/* Display the username */}
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
