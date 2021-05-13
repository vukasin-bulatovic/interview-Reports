import React from "react";
import "./CompanyCard.scss";

const CompanyCard = (props) => {
  let background = {};
  if (props.companyId === props.company.id)
    background = { backgroundColor: "#ff893d" };
  return (
    <div
      className="companyWiz"
      onClick={() => props.addCompany(props.company.id, props.company.name)}
      style={background}
    >
      <div className="card-wrapperWiz">
        <div className="nameandemailWiz">
          <h3 className="nameWiz">{props.company.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
