//Write a sample node.js backend api app that gets employee detail from a sample employee json file. I want list of all employee api and fetch employee by id
//api. Use express.js for routing and fs module to read json file.
// Sample employee json file

const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const app = express();
app.use(express.json());
const port = 3000;

// add logging to all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/employees", (req, res) => {
  try {
    const employees = fs.readFileSync("employees.json");
    console.log(
      {
        function: "getEmployees",
        data: {
          "number_of_employees": JSON.parse(employees).length,
        },
      });
    res.send(JSON.parse(employees));
  }
  catch (err) {
    console.log({
      function: "getEmployees",
      error: err,
    });
    res.status(500).send("Error reading employees.json");
  }
});



app.get("/employees/:id", (req, res) => {
  try {
    const employees = fs.readFileSync("employees.json");
    const employee = JSON.parse(employees).find((e) => e.id === parseInt(req.params.id));
    if (!employee) {
      console.log({
        function: "getEmployeeById",
        data: {
          id: req.params.id,
          error: "Employee not found",
        },
      });
      res.status(404).send("Employee not found");
      return;
    }
    console.log({
      function: "getEmployeeById",
      data: employee,
    });
    res.send(employee);
  } catch (err) {
    console.log({
      function: "getEmployeeById",
      error: err,
    });
    res.status(500).send("Error reading employees.json");
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});