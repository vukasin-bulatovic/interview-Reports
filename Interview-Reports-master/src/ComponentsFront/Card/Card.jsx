import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import Photo from "../../img/photo.jpg";
const Card = (props) => {
  const { candidate } = props;
  return (
    <div className="card">
      <div className="card-wrapper">
        <img src={Photo} alt="avatar" />
        <div className="nameandemail">
          <h3 className="name">{candidate.name}</h3>
          <p className="email">{candidate.email}</p>
        </div>
      </div>
      <Link
        to=  {`/candidate/${candidate.id}`}
        
      >
        <button className="infoButton">Info</button>
      </Link>
    </div>
  );
};

export default Card;
