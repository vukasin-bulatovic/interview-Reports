import React, { useState } from "react";
import "./Candidates.scss";
import Card from "../../ComponentsFront/Card/Card";
import { v4 as uuid } from "uuid";
const Candidates = (props) => {
  const [inputValue, setInputValue] = useState("");
  let filteredData = props.candidates.filter((e) =>
    e.name.toLowerCase().includes(inputValue.toLocaleLowerCase())
  );

  return (
    <>
      <div className="searchCandidates">
        <h1>Interview Reports</h1>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="&#x2315; Search"
          type="text"
        />
      </div>
      <div className="candidatesdiv">
        {filteredData.map((e) => (
          <Card key={uuid()} candidate={e} />
        ))}
      </div>
    </>
  );
};

export default Candidates;
