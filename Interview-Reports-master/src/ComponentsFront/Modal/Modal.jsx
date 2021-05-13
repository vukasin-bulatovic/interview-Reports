import React from "react";
import ReactDom from "react-dom";

const Modal = ({ open, e, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal">
          <h2>{e.candidateName}</h2>
          <hr />
          <div className="modalInfo">
            <div className="personalInfo">
              <p>Company</p>
              <h2>{e.companyName}</h2>
              <p>Interview Date</p>
              <h2>
                {new Date(e.interviewDate).getDate() +
                  " " +
                  new Date(e.interviewDate).getMonth() +
                  1 +
                  " " +
                  new Date(e.interviewDate).getFullYear()}
              </h2>
              <p>Phase</p>
              <h2>{e.phase}</h2>
              <p>Status</p>
              <h2>{e.status}</h2>
            </div>
            <div className="modalNotes">
              <p>Notes</p>
              <p className="personalNote">{e.note}</p>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
