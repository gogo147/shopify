import "./LogCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginCard(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="con">
      <div className="Login">
        <div className="Title">Log In</div>
        <div className="box" onSubmit={(e) => e.preventDefault()}>
          <input type='text' 
            className="inp"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type='text'
            className="inp"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn" onClick={() => props.login(username, password)}>
            Log In
          </div>
          <Link to="/register" className="style">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;