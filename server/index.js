const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 5001

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
  debug: false,
  connectionLimit: 100,
});

 app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
}); 

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});


app.get("/checkpassword", (req, res) => {
  db.query("SELECT * FROM justchecktemp", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});

 app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  console.log(`typeof id: ` + typeof id);
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}); 

 app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 

app.listen(5001, () => {
  console.log(`Yey, your server is running on port ${port}`);
  //console.log(`trying the new quotation `);

});

//only for this purpose
//http://localhost:5001/min/age
app.get("/min/age", (req, res) => {
  db.query("SELECT position, MIN(age) AS youngestEmployee FROM employeesystem.employees group by position having MIN(age) >= 35", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});

//http://localhost:5001/max/age
app.get("/max/age", (req, res) => {
  db.query("SELECT position, max(wage) AS biggestWage FROM employeesystem.employees group by position having max(wage) >= 50 ;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});

//http://localhost:5001/avg/age
app.get("/avg/age", (req, res) => {
  db.query("SELECT position, avg(wage) AS avg_Wage, avg(age) AS avg_age FROM employeesystem.employees where position != 'CEO' group by position having max(age) >= 15", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});


//http://localhost:5001/count/diversity
app.get("/count/diversity", (req, res) => {
  db.query("SELECT count(distinct country) AS diversity FROM employeesystem.employees;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});


//http://localhost:5001/join
app.get("/join", (req, res) => {
  db.query("SELECT * FROM  employeesystem.employees INNER JOIN employeesystem.devices ON employeesystem.employees.id = employeesystem.devices.recording_empID  order by employeesystem.employees.id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  
});