import axios from "axios";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };
  const find = () => {
    console.log(name);
    axios.use(`http://localhost:5000/api/student`);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <p>Enter Student Name:</p>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleInputChange}
        style={{ width: "30%" }}
      />
      <br />
      <input
        type="submit"
        value="search"
        onClick={find}
        style={{ width: "5%" }}
      />
    </div>
  );
};

export default Search;
