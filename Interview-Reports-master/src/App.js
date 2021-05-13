import "./App.scss";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
  import { useEffect, useState } from "react";
import HeaderFront from "./ComponentsFront/HeaderFront/HeaderFront";
import Candidates from "./PagesFront/Candidates/Candidates";
import Candidate from "./PagesFront/Candidate/Candidate";
import LoginPage from "./PagesBack/LoginPage/Login";
import Reports from "./ComponentsBack/Reports/Reports";
import Wizard from "./ComponentsBack/Wizard/Wizard";
function App() {
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [dataUpToDate, setDataUpToDate] = useState(false);
  useEffect(() => {
    if (!dataUpToDate) {
      fetch("http://localhost:3333/api/candidates")
        .then((data) => data.json())
        .then((data) => setCandidates(data));
      fetch("http://localhost:3333/api/reports")
        .then((data) => data.json())
        .then((data) => setReports(data));
      fetch("http://localhost:3333/api/companies")
        .then((data) => data.json())
        .then((data) => setCompanies(data));
      setDataUpToDate(true);
    }
  }, [dataUpToDate]);
  return (
    <>
      <HeaderFront token={token} setToken={setToken} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Candidates candidates={candidates} reports={reports} />
          )}
        />
        <Route
          path="/candidate/:id"
          render={(routeInfo) => (
            <Candidate
              {...routeInfo}
              candidates={candidates}
              reports={reports}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={() => <LoginPage setToken={setToken} />}
        />
        {token ? (
          <Route
            exact
            path="/reports"
            render={() => (
              <Reports
                reports={reports}
                token={token}
                setToken={setToken}
                setDataUpToDate={setDataUpToDate}
              />
            )}
          />
        ) : (
          <Redirect to="/login" />
        )}
        {token ? (
          <Route
            exact
            path="/wizard"
            render={() => (
              <Wizard
                candidates={candidates}
                companies={companies}
                token={token}
                setToken={setToken}
                setDataUpToDate={setDataUpToDate}
              />
            )}
          />
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </>
  );
}

export default App;
