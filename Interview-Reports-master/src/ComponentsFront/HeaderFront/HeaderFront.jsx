import React from "react";
import "./HeaderFront.scss";
import { Link } from "react-router-dom";

const HeaderFront = (props) => {
  return (
    <header className="headerFrontBackground">
      <div className="headerFront">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="logo">Logo</h1>
        </Link>
        <div className="loginLogout">
          {props.token ? (
            <>
              <Link to="/reports">
                <button>Reports</button>
              </Link>
              <Link to="/Wizard">
                <button>Create Report</button>
              </Link>

              <Link to="/">
                <button
                  onClick={() => {
                    props.setToken("");
                    localStorage.setItem("token", "");
                  }}
                >
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default HeaderFront;
