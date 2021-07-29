const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoletable = require("console.table");
// const fs = require("fs");

const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '82Q57A94',
        database: 'employees_db'
    },
    // console.log(`Connected to the classlist_db database.`)
);
//connect mysql and run askUser();
db.connect((err) => {
        if (err) throw err
        askUser();
    })
    //run inquirer
function askUser() {
    inquirer.prompt([{
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: ["view all roles", "view all employees", "view all departments", "add a department", "add a role", "add an employee", "update an employee role", "nothing else"]
            //promise statement: send rsponse according to what the user does
    }]).then(response => {
        switch (response) {
            case a:
                if (response.answer == "view all roles") {
                    viewRole();
                }
                // code block
                break;
            case b:
                if (response.answer == "view all employees") {
                    viewEmployees();
                }
                // code block
                break;
            case c:
                if (response.answer == "view all departments") {
                    viewDept();
                }
                break;
            case d:
                if (response.answer == "add a department") {
                    addDept();
                }
                break;
            case e:
                if (response.answer == "add a role") {
                    addRole();
                }
                break;
            case f:
                if (response.answer == "add an employee") {
                    addEmployee();
                }
                break;
            case g:
                if (response.answer == "update an employee") {
                    updateEmployee();
                }
                break;
            case h:
                if (response == "nothing else") {
                    console.log("k thanks bye!")
                    return;
                }
                break;
                // code block
        }

    })

}

function viewRole() {
    //viewRole() //: get every role that exists
    var sql1 = "SELECT * FROM (role)"
    db.query(sql1, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}

function viewEmployees() {
    var sql2 = "SELECT * FROM (employees)"
        //viewEmployees() = view complete list of every employee
    db.query(sql2, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}

function viewDept() {
    //viewDept: view all departments that exist
    var sql3 = "SELECT * FROM(department)"
    db.query(sql3, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();

    })
}

function addDept() {
    //addDept(): add a department
    var sql4 = "SELECT * FROM department INSERT INTO department (name) VALUES"
    db.query(sql4, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}

function addRole() {
    //addRole(): add a role for a certain employee
    var sql5 = "SELECT * FROM role INSERT INTO role (name) VALUES"
    db.query(sql5, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}

function addEmployee() {
    //add a new employee to table
    var sql6 = "SELECT * FROM employee INSERT INTO employee (name) VALUES"
    db.query(sql6, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}

function updateEmployee() {
    //update a current employees information
    var sql7 = "SELECT (employee id, lastname, firstname, salary, role, department, manager) FROM employees_db SET (name) VALUES WHERE id = NOT NULL"
    db.query(sql7, (err, rows) => {
        if (err) throw err;
        //run console.table rows in the terminal and revert to run askUser() function for users next option
        console.table(rows)
        askUser();
    })
}