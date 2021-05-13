import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Wizard.scss";
import CardWiz from "../CardWiz/CardWiz";
import CompanyCard from "../CompanyCard/CompanyCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid } from "uuid";
const Wizard = (props) => {
  const [candidateId, setCandidateId] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [phase, setPhase] = useState("technical");
  const [status, setStatus] = useState("passed");
  const [notes, setNotes] = useState("");
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");

  const gray = { color: "gray", fontWeight: 300 };

  // CANDIDATES FILTER
  let filteredData = props.candidates.filter((e) =>
    e.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );
  // COMPANIES FILTER
  let filteredCompanyData = props.companies.filter((e) =>
    e.name.toLowerCase().includes(inputValueCompany.toLocaleLowerCase())
  );

  const addCandidate = (id, candidateName) => {
    setCandidateName(candidateName);
    setCandidateId(id);
  };

  const addCompany = (id, companyName) => {
    setCompanyId(id);
    setCompanyName(companyName);
  };

  const handleFetch = () => {
    fetch("http://localhost:3333/api/reports/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        candidateId: candidateId,
        candidateName: candidateName,
        companyId: companyId,
        companyName: companyName,
        interviewDate: startDate,
        phase: phase,
        status: status,
        note: notes,
      }),
    }).then((res) => {
      console.log(res);
      if (res.status === 401) {
        props.setToken(null);
      }
    });
    props.setDataUpToDate(false);
  };

  //   -----WIZARD FIRST PAGE-----
  if (page === 1) {
    return (
      <div className="wizardCandidate">
        <div className="steps">
          <div>
            <div className="number no1">1</div>
            <h2>Select Candidate</h2>
          </div>
          <div>
            <div className="number" style={gray}>
              2
            </div>
            <h2 style={gray}>Select Company</h2>
          </div>
          <div>
            <div className="number" style={gray}>
              3
            </div>
            <h2 style={gray}>Fill Report Details</h2>
          </div>
        </div>
        <div className="wizardCandidates">
          <input
            placeholder="&#x2315; Search"
            className="searchWizard"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {filteredData.map((candidate) => (
            <CardWiz
              key={uuid()}
              candidate={candidate}
              addCandidate={addCandidate}
              candidateId={candidateId}
            />
          ))}
          <button
            className="next wizardNext"
            onClick={() => {
              if (candidateName) setPage(2);
              else alert("Please select candidate");
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    );
    //   -----WIZARD SECOND PAGE-----
  } else if (page === 2) {
    return (
      <div className="wizardCandidate">
        <div className="steps">
          <div>
            <div className="number" style={gray}>
              1
            </div>
            <h2 style={gray}>Select Candidate</h2>
          </div>
          <div>
            <div className="number">2</div>
            <h2>Select Company</h2>
          </div>
          <div>
            <div className="number" style={gray}>
              3
            </div>
            <h2 style={gray}>Fill Report Details</h2>
          </div>
          <hr />
          <p>Candidate:</p>
          <h3>{candidateName}</h3>
        </div>

        <div className="wizardCandidates">
          <input
            placeholder="&#x2315; Search"
            className="searchWizard"
            type="text"
            value={inputValueCompany}
            onChange={(e) => setInputValueCompany(e.target.value)}
          />
          {filteredCompanyData.map((company) => (
            <CompanyCard
              key={uuid()}
              company={company}
              addCompany={addCompany}
              companyId={companyId}
            />
          ))}
          <div className="backNextButtons">
            <button
              className="wizardNext back"
              onClick={() => {
                setPage(1);
              }}
            >
              BACK
            </button>
            <button
              className="next wizardNext"
              onClick={() => {
                if (companyName) setPage(3);
                else alert("Please select a company");
              }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    );

    //   -----WIZARD THIRD PAGE-----
  } else if (page === 3) {
    return (
      <div className="wizardCandidate">
        <div className="steps">
          <div>
            <div className="number" style={gray}>
              1
            </div>
            <h2 style={gray}>Select Candidate</h2>
          </div>
          <div>
            <div className="number" style={gray}>
              2
            </div>
            <h2 style={gray}>Select Company</h2>
          </div>
          <div>
            <div className="number">3</div>
            <h2>Fill Report Details</h2>
          </div>
          <hr />
          <p>Candidate:</p>
          <h3>{candidateName}</h3>
          <p>Company:</p>
          <h3>{companyName}</h3>
        </div>
        <div className="thirdPageDiv">
          <div className="datePhaseStatus">
            <div className="date">
              <p>Date</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (new Date() < date) alert("Pick a past date");
                  else setStartDate(date);
                }}
              />
            </div>
            <div className="phase">
              <p>Phase</p>
              <select onChange={(e) => setPhase(e.target.value)}>
                <option value="cv">CV</option>
                <option value="technical">Technical</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div className="status">
              <p>Status</p>
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="passed">Passed</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>
          <div className="notes">
            <p>Notes:</p>
            <textarea
              className="modalNotes personalNote"
              name="notes"
              id=""
              cols="30"
              rows="10"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="backNextButtons">
            <button className="back wizardNext" onClick={() => setPage(2)}>
              BACK
            </button>
            <Link to="/reports">
              <button className="next wizardNext" onClick={() => handleFetch()}>
                SUBMIT
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Wizard;
