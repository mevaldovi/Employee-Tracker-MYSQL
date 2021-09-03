const express = require('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3000;
const app = express();
const consoletable = require("console.table");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const fs = require("fs");

const db = mysql.createConnection({
        host: "localhost",
        // MySQL username,
        user: "root",
        // MySQL password
        password: "82Q57A94",
        database: "employees_db",
    },
    console.log(`Connected to the classlist_db database.`)
);
//connect mysql and run askUser();
// db.connect((err) => {
//     if (err) throw err;
//     askUser();
// });
//run inquirer
const askUser = () => {
    inquirer
        .prompt([{
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
                "nothing else"
            ]
            //promise statement: send rsponse according to what the user does
        }])
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
                case "update an employee":
                    updateEmployee();
                    break;
                case "nothing else":
                    console.log(" thanks!");
                    //call the function here to display complete table
                    break;
                    // code block
            }
        });
}

function viewRole() {
    //viewRole() //: get every role that exists
    var sql1 = "SELECT * FROM (role)";
    db.query(sql1, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function viewEmployees() {
    var sql2 = "SELECT * FROM (employee)";
    //viewEmployees() = view complete list of every employee
    db.query(sql2, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function viewDept() {
    //viewDept: view all departments that exist
    var sql3 = "SELECT * FROM(department)";
    db.query(sql3, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function addDept() {
    //addDept(): add a department
    let dept = rows.input;
    const sql4 = `INSERT INTO department(department_name) VALUES (${dept})`;
    //how do they expect me to define somethings that is already defined in js library??
    db.query(sql4, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function addRole() {
    //addRole(): add a role for a certain employee
    let role = rows.input;
    const sql5 = `SELECT * FROM role INSERT INTO role (name) VALUES (${role})`;
    db.query(sql5, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function addEmployee() {
    //add a new employee to table
    let newEmployee = rows.input;
    const sql6 = `SELECT * FROM employee INSERT INTO employee (name) VALUES (${newEmployee})`;
    db.query(sql6, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}

function updateEmployee() {
    //update a current employees information
    const sql7 = `SELECT(employee id, lastname, firstname, salary, role, department, manager) FROM employees_db SET(name) VALUES WHERE (${updateEmployee})`;
    let updateEmployee = rows.input;
    db.query(sql7, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows);
        askUser();
    });
}


//declare function here to display entire table when user opts to finish updates
askUser();
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})