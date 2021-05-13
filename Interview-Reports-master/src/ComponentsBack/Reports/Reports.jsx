import React, { useState } from "react";
import "./Reports.scss";
import Modal from "../../ComponentsFront/Modal/Modal";
import { v4 as uuid } from "uuid";
const Reports = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState(null);
  const showModal = (rep) => {
    setIsOpen(true);
    setReport(rep);
  };

  const delReport = (e) => {
    fetch("http://localhost:3333/api/reports/" + e.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 401) {
        props.setToken(null);
      }
    });
    props.setDataUpToDate(false);
  };

  const [inputValue, setInputValue] = useState("");
  const { reports } = props;
  let filteredData = reports.filter(
    (e) =>
      e.candidateName.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      e.companyName.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      e.status.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  return (
    <>
      <div className="searchReports">
        <h1>Reports Administration</h1>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="&#x2315; Search"
          type="text"
        />
      </div>
      <div className="reportsWrapper">
        {filteredData.map((e) => (
          <div className="reportWrapper" key={uuid()}>
            <div>
              <h4>{e.companyName}</h4>
              <h6>Company</h6>
            </div>
            <div>
              <h4>{e.candidateName}</h4>
              <h6>Candidate</h6>
            </div>
            <div>
              <h4>
                {new Date(e.interviewDate).getDate() +
                  " " +
                  new Date(e.interviewDate).getMonth() +
                  1 +
                  " " +
                  new Date(e.interviewDate).getFullYear()}
              </h4>
              <h6>Interview Date</h6>
            </div>
            <div>
              <h4>{e.status}</h4>
              <h6>Status</h6>
            </div>
            <div>
              <i className="fas fa-eye" onClick={() => showModal(e)}></i>
              <Modal
                e={report}
                onClose={() => setIsOpen(false)}
                open={isOpen}
              ></Modal>{" "}
              <i
                className="fas fa-trash-alt delete"
                onClick={() => delReport(e)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reports;
