import React, { useEffect, useState } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setName(e.target.value);
  };
  const find = () => {
    console.log(name);
    axios
      .get(`http://localhost:5000/api/student?name=${name}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/student");
    setData(response.data);
  };
  const deleteContact = (id) => {
    if (window.confirm("Do you want to delete this record?")) {
      axios.delete(`http://localhost:5000/api/student/${id}`);
      toast.success("Record Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  const deleteAll = () => {
    if (window.confirm("Do you want to delete all records?")) {
      axios.delete(`http://localhost:5000/api/student/`);
      toast.success("All Records Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <p>Enter Student Name:</p>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleInputChange}
        style={{ width: "30%" }}
      />{" "}
      <input
        type="submit"
        value="search"
        onClick={find}
        style={{ width: "8%" }}
      />
      <br />
      <Link to="/addContact">
        <button
          className="btn btn-contact"
          style={{ backgroundColor: "green" }}
        >
          Add Student
        </button>
      </Link>
      <button className="btn btn-delete" onClick={deleteAll}>
        Delete All
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      deleteContact(item.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
