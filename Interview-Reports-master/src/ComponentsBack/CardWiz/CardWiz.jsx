import React from "react";
import "./CardWiz.scss";
import Photo from "../../img/photo.jpg";
const CardWiz = (props) => {
  const { candidate } = props;
  let background = {};
  if (props.candidateId === candidate.id)
    background = { backgroundColor: "#fb743e" };
  return (
    <div
      className="cardWiz"
      onClick={() => props.addCandidate(candidate.id, candidate.name)}
      style={background}
    >
      <div className="card-wrapperWiz">
        <img src={Photo} alt="avatar" />
        <div className="nameandemailWiz">
          <h3 className="nameWiz">{candidate.name}</h3>
          <p className="emailWiz">{candidate.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CardWiz;
