import React from "react";
import "./Candidate.scss";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import Photo from "../../img/photo.jpg";

import Modal from "../../ComponentsFront/Modal/Modal";

const Candidate = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState(null);

  const showModal = (rep) => {
    setIsOpen(true);
    setReport(rep);
  };

  const candidate = props.candidates.find((e) => props.match.params.id == e.id);
  const reports = props.reports.filter(
    (e) => props.match.params.id == e.candidateId
  );

  console.log(props)

  return candidate && reports ? (
    <>
      <div className="singleCandidateDiv">
        <div className="infoDiv">
          <img src={Photo} alt="" />
          <div className="nameeMailDiv">
            <h6>Name:</h6>
            <h3>{candidate.name}</h3>
            <h6>Email:</h6>
            <h3>{candidate.email}</h3>
          </div>
          <div className="dateEducationDiv">
            <h6>Date:</h6>
            <h3>
              {new Date(candidate.birthday).getDate() +
                " " +
                (new Date(candidate.birthday).getMonth() + 1) +
                " " +
                new Date(candidate.birthday).getFullYear()}
            </h3>
            <h6>Education:</h6>
            <h3>{candidate.education}</h3>
          </div>
        </div>
        <h2>Reports</h2>
        <table>
          <thead>
            <tr>
              <td>Company</td>
              <td>Interview Date</td>
              <td colSpan="2">Status</td>
            </tr>
          </thead>

          <tbody>
            {reports.map((e) => (
              <tr key={uuid()}>
                <td>{e.companyName}</td>
                <td>
                  {new Date(e.interviewDate).getDate() +
                    " " +
                    new Date(e.interviewDate).getMonth() +
                    1 +
                    " " +
                    new Date(e.interviewDate).getFullYear()}
                </td>
                <td>{e.status}</td>
                <td>
                  <div className="candidate">
                    <i className="fas fa-eye" onClick={() => showModal(e)}></i>
                    <Modal
                      e={report}
                      onClose={() => setIsOpen(false)}
                      open={isOpen}
                    ></Modal>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : null;
};

export default Candidate;
