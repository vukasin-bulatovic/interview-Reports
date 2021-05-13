import React from "react";
import "./Login.scss";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const LoginPage = (props) => {
  const [tokenOk, setTokenOk] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const sendForm = () => {
    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) return data;
          throw new Error(data);
        })
      )
      .then((data) => {
        props.setToken(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        setTokenOk(1);
      })
      .catch((err) => {
        setError(err.toString());
      });
  };

  return tokenOk ? (
    <Redirect to="/reports" />
  ) : (
    <div className="loginPage">
      <div className="formBorder">
        <form action="POST">
          <p>Email:</p>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password:</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id='login' type="button" onClick={sendForm}>
            Login
          </button>
          <h3>{error}</h3>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
