const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoletable = require("console.table");

const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employees_db'
    },
    // console.log(`Connected to the classlist_db database.`)
);

db.connect((err) => {
    if (err) throw err
    askUser();
})

function askUser() {
    inquirer.prompt([{
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: ["view all roles", "view all employees", "view all departments", "add a department", "add a role", "add an employee", "update an employee role"]

    }]).then(response => {
        if (response.answer == "view all roles") {
            viewRole();
        }
    })


}

function viewRole() {
    //viewRole() //: get every role that exists
    var sql1 = SELECT * FROM role
    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows)
        askUser();
    })
}

function viewEmployee() {
    var sql2 = SELECT * FROM employees
    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows)
        askUser();
    })
}

function viewDept() {
    var sql3 = SELECT * FROM department
    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows)
        askUser();

    })
}

function addDept() {}
// var sql4 = INSERT_VALUES}