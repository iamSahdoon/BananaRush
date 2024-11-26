import "./Ranking.css";
import back from "../images/back.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Firestore functions
import { database } from "../../firebase/config"; // Firebase config

export const Ranking = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch users data from Firestore
  const fetchRankingData = async () => {
    try {
      const usersCollection = collection(database, "users"); // Reference to "users" collection
      const usersQuery = query(usersCollection, orderBy("points", "desc")); // Query to order users by points
      const querySnapshot = await getDocs(usersQuery);

      const usersList = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        username: doc.data().username || "Unknown User",
        points: doc.data().points || 0,
        lastMatchDate: doc.data().lastMatchDate
          ? new Date(
              doc.data().lastMatchDate.seconds * 1000
            ).toLocaleDateString() // Convert Firestore timestamp to readable date
          : "N/A",
      }));

      setUsers(usersList); // Update users state
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch ranking data on component mount
  useEffect(() => {
    fetchRankingData();
  }, []);

  return (
    <>
      <div className="container-ranking">
        <div className="header-back-ranking">
          <Link to="/">
            <img src={back} alt="Banana Login Signup" />
          </Link>
        </div>

        <div className="hero-text-ranking">
          <h1>Banana Ranking</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Points</th>
                    <th>Last Match Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.rank}</td>
                      <td>{user.username}</td>
                      <td>{user.points}</td>
                      <td>{user.lastMatchDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
