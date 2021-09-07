// const express = require('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const PORT = process.env.PORT || 3000;
// const app = express();
const consoletable = require("console.table");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const fs = require("fs");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "82Q57A94",
    database: "employeelist_db",
  },
  console.log(`Connected to the employeelist_db database.`)
);
//connect mysql and run askUser();
db.connect((err) => {
  if (err) throw err;
  askUser();
});
//run inquirer
const askUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: [
          "view all roles",
          "view all employees",
          "view all departments",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "nothing else",
        ],
        //promise statement: send rsponse according to what the user does
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.answer) {
        case "view all roles":
          viewRole();
          break;
        case "view all employees":
          viewEmployees();

          // code block
          break;
        case "view all departments":
          viewDept();
          break;
        case "add a department":
          addDept();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
        default:
          console.log(" thanks!");
          process.exit();
      }
    });
};

function viewRole() {
  //viewRole() //: get every role that exists
  db.query(`SELECT * FROM role;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    //run console.table result in the terminal and revert to run askUser() function for users next option
    askUser();
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    //run console.table result in the terminal and revert to run askUser() function for users next option
    askUser();
  });
}

function viewDept() {
  //viewDept: view all departments that exist
  db.query(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    //run console.table result in the terminal and revert to run askUser() function for users next option
    askUser();
  });
}

async function addEmployee() {
  //add a new employee to table
  const [employeeChoices] = await db
    .promise()
    .query(
      "SELECT id AS value, CONCAT(first_name,' ', last_name) AS name FROM employee"
    );
  const [roleChoices] = await db
    .promise()
    .query("SELECT id AS value, title AS name FROM role");
  const response = await inquirer.prompt([
    {
      type: "input",
      message: "employee first name?",
      name: "first",
    },
    {
      type: "input",
      message: "employee last name?",
      name: "last",
    },
    {
      type: "list",
      message: "employee role?",
      name: "role",
      choices: roleChoices,
    },
    {
      type: "list",
      message: "employee manager?",
      name: "manager",
      choices: employeeChoices,
    },
  ]);
  console.log(response);
  let first = response.first;
  let last = response.last;
  let role = response.role;
  let manager = response.manager;
  // here i need to convert role and manager into their corr id's
  // let roleId = await convertRoleToId(role)
  // let mgrId = await convertMgrToId(manager)
  //convert manager role to corresponding id

  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
        (?,?,?,?);`,
    [first, last, role, manager],
    (err, results) => {
      if (err) throw err;
      console.table(
        `success! you added ${first} ${last} with the role of ${role} and the manager is ${manager}`
      );
      askUser();
    }
  );
}
async function addDept() {
  try {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "what is the name of the department you wish to add?",
      },
    ]);
    await db.promise().query("INSERT INTO department SET ?", response);
    console.log("added a department!");
    askUser();
  } catch (err) {
    console.log(err);
  }
}
async function addRole() {
  try {
    const [departmentChoices] = await db
      .promise()
      .query("SELECT id AS value, name FROM department");
    // [[{name: "programming", value: 1}, {name: "cybersecurity", value: 2}]]
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "what is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "what is the annual salary of this role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "what is the department for this role?",
        choices: departmentChoices,
      },
    ]);
    await db.promise().query("INSERT INTO role SET ?", response);
    console.log("added new role!");
    askUser();
  } catch (err) {
    console.log(err);
  }
}

async function updateEmployee() {
  try {
    const roles = await db
      .promise()
      .query("SELECT id AS value, title AS name FROM role");
    const roleChoices = roles[0];
    const employees = await db
    .promise()
    .query(
      "SELECT id AS value, CONCAT(first_name,' ', last_name) AS name FROM employee"
    );
    const employeeChoices = employees[0];
    const response = await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "What is the employee you wish to update?",
            choices: employeeChoices
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's new role?",
            choices: roleChoices
        }
    ])
    await db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role, response.employee_id])
  } catch (err) {
    console.log(err);
  }
}

const convertMgrToId = (mgr) => {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '%${mgr}%';`,
      function (err, results) {
        if (err) throw err;

        let id = results[0].id;
        resolve(id);
      }
    );
  });
};

const convertRoleToId = (role) => {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * FROM roles WHERE title LIKE '%${role}%';`,
      function (err, results) {
        if (err) reject(err);
        console.log(results);
        let id = results[0].id;
        resolve(id);
      }
    );
  });
};

//declare function here to display entire table when user opts to finish updates
// askUser();
// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`)
// })
