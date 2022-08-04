const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "sql6.freemysqlhosting.net",
  user: "sql6510819",
  password: "wKLBMAbgCF",
  database: "sql6510819",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/student", (req, res) => {
  const sqlGet = "SELECT * FROM student_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.get("/api/student", (req, res, next) => {
  const name = req.query;
  console.log(name);
  const sqlFind = "SELECT * FROM student_db WHERE name=?";
  db.query(sqlFind, name, (error, result) => {
    if (error) {
      console.log("error", error);
    }
    console.log("result", result);
    res.send(result);
  });
});

app.get("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM student_db WHERE id=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log("error ", error);
    }
    res.send(result);
  });
});

app.put("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate = "UPDATE contact_db SET name=?,email=?,contact=? WHERE id=?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log("error ", error);
    }
    res.send(result);
  });
});

app.post("/api/student", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO student_db (name,email,contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (err, result) => {
    if (err) {
      console.log("error", error);
    }
    console.log("result", result);
  });
});

app.delete("/api/student/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM student_db WHERE id=?";
  db.query(sqlRemove, [id], (err, result) => {
    if (err) {
      console.log("error", error);
    }
  });
});

app.delete("/api/student", (req, res) => {
  const sqlGet = "DELETE FROM student_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on Port 5000");
});
