import "./Signup.css";
import back from "../images/back.svg";
import { Link } from "react-router-dom";
import tologin from "../images/tologin.svg";
import register from "../images/register.svg";

import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
  const initialState = {
    email: { required: false },
    password: { required: false },
  };
  const [errors, setErrors] = useState(initialState);
  const [accountCreated, setAccountCreated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // prevents page from reloading when we click register

    // Validation check
    if (!email || !password) {
      setErrors({
        email: { required: !email }, // sets email required error if email is empty
        password: { required: !password }, // sets password required error if password is empty
      });
      return; // stops the function if either field is empty
    }
    // Clear errors if both fields are filled
    setErrors(initialState);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created");
      setAccountCreated(true); // Set account created to true on success
    } catch (error) {
      console.log(error);
      setAccountCreated(false); // Clear success message on error
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
          <div className="box">
            <form>
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
              {errors.email.required ? <span>:( Email required</span> : null}
              {errors.password.required ? (
                <span>:( Password required</span>
              ) : null}
              {accountCreated && <span>:) Player registered successfully</span>}
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

        {/* <p>Copyright © 2022 BANANA RUSH. All rights reserved.</p> */}
      </div>
    </>
  );
};
