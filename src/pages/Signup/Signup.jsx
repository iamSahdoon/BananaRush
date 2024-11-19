import "./Signup.css";
import back from "../images/back.svg";
import { Link } from "react-router-dom";
import tologin from "../images/tologin.svg";
import register from "../images/register.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
  const initialState = {
    username: { required: false },
    email: { required: false },
    password: { required: false },
  };
  const [errors, setErrors] = useState(initialState);
  const [accountCreated, setAccountCreated] = useState(false); // for account creation in Firebase
  const [registerError, setRegisterError] = useState(""); // For Firebase error message

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page from reloading

    // Validation check
    if (!email || !password) {
      setErrors({
        username: { required: !username }, // Clear username error on registration
        email: { required: !email }, // Set email required error if email is empty
        password: { required: !password }, // Set password required error if password is empty
      });
      return; // Stop function if either field is empty
    }

    // Clear errors if both fields are filled
    setErrors(initialState);
    setRegisterError(""); // Clear any previous error messages
    setAccountCreated(false); // Reset success message

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created");
      setAccountCreated(true); // Set account created to true on success

      // Delay navigation by 2 seconds to show success message
      setTimeout(() => {
        navigate("/loginSection");
      }, 2000); // 2000 ms = 2 seconds
    } catch (error) {
      console.log(error);
      setAccountCreated(false); // Clear success message on error
      setRegisterError("User already exists"); // Set the error message
    }
  };

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
          <div className="box-signup">
            <form>
              <input
                className="username"
                type="text"
                name="username"
                id="username"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="password"
                type="password"
                name="name"
                id="email"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className="error-span">
              {errors.username.required ? (
                <span>:( Username required</span>
              ) : null}
              {errors.email.required ? <span>:( Email required</span> : null}
              {errors.password.required ? (
                <span>:( Password required</span>
              ) : null}
              {accountCreated && <span>:) Player registered successfully</span>}
              {registerError && <span>:( {registerError}</span>}
            </div>
            <div className="img-container">
              <Link to="/loginSection">
                <img className="tosignup" src={tologin} alt="siginup" />
              </Link>
              <button type="submit" onClick={handleRegister}>
                <img className="play" src={register} alt="play" />
              </button>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>V1.0</p>
          <p>made by : Sabique</p>
        </div>
      </div>
    </>
  );
};
