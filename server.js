var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = require('./db/connection.js');

function promptUser () {
inquirer.prompt([
    {
        type: 'list',
        name: 'choiceSelect',
        message: 'Welcome!  What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'View employee by manager', 'View employee by department', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
])
.then(answers => {
   switch (answers.choiceSelect) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break; 
        case 'Add an employee':
            addEmployee();
            break; 
        case 'Update an employee role':
            updateEmployee();
            break; 
        case 'View employee by manager':
            viewByManager();
            break; 
        case 'View employee by department':
            viewByDepartment();
            break; 
   }
})
};
promptUser();

function additionalPrompt () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choicesSelect',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees','View employee by manager', 'View employee by department', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End Session']
        }
    ])
    .then(answers => {
       switch (answers.choicesSelect) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break; 
            case 'Add an employee':
                addEmployee();
                break; 
            case 'Update an employee role':
                updateEmployee();
                break; 
            case 'End Session':
                end();
                break; 
            case 'View employee by manager':
                viewByManager();
                break; 
            case 'View employee by department':
                viewByDepartment();
                break; 
       }
    })
    };

function end () {
    console.log('Goodbye!');
    process.exit();
};

function viewDepartments(){
    db.query(`SELECT * FROM department`, (err, row) =>{
        if (err) {
            console.log(err);
        }
        console.table(row);
        additionalPrompt();
    });
};

function viewRoles(){
    db.query(`SELECT role.*, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id`, (err, row) =>{
        if (err) {
            console.log(err);
        }
        console.table(row);
        additionalPrompt();
    });
};

function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.job_title, department.department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id
    `, (err, row) =>{
        if (err) {
            console.log(err);
        }
        console.table(row);
        additionalPrompt();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please add a new department.'
        }
    ])
.then(function(answer) {
    db.query("INSERT INTO department (department_name) VALUES (?)", [answer.newDepartment], function(err, row) {
        if (err) throw err;
        viewDepartments();
      });
    });
};

function addRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: 'Please enter the name of the new role that you wish to add'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'Please enter the salary for this role.'
        },
        {
            type: 'input', 
            name: 'newDepartment',
            message: 'Please enter the id number of the department that you would like to assign this role to.'
        }
    ])
.then(function(answer) {
    db.query("INSERT INTO role (job_title, salary, department_id) VALUES (?, ?, ?)", [answer.newName, answer.newSalary, answer.newDepartment], function(err, row) {
        if (err) throw err;
            viewRoles();
        });
    });
};

function addEmployee () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'newFirst',
            message: "Please enter the first name of the employee." 
        },
        {
            type: 'input',
            name: 'newLast',
            message: "Please enter the last name of the employee."
        },
        {
            type: 'input',
            name: 'newTitle',
            message: "Please enter the id number for the role you are assigning this employee to."
        },
        {
            type: 'input',
            name: 'newManager',
            message: "Please enter the id number of the manager that this employee will be assigned to."
        }
    ])
.then(function(answer) {
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newFirst, answer.newLast, answer.newTitle, answer.newManager], function(err, row) {
        if (err) throw err;
            viewEmployees();
        });
    });
};

function updateEmployee () {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'updateEmpl',
            message: "Please enter the id number of the employee that you would like to update." 
        },
        {
            type: 'input',
            name: 'updateRole',
            message: "Please enter the id number of the new role that you would like to assign to this employee."
        }
    ])
.then(function(answer) {
    db.query("Update employee SET role_id = ? WHERE id = ?", [answer.updateRole, answer.updateEmpl], function(err, row) {
        if (err) throw err;
            viewEmployees();
        });
    });
};

// Bonus - View Employees By Manager
function viewByManager() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id
    `, (err, row) =>{
        if (err) {
            console.log(err);
        }
        console.table(row);
        additionalPrompt();
    });
};

// Bonus - View Employees By Department
function viewByDepartment() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, department.department_name FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id
    `, (err, row) =>{
        if (err) {
            console.log(err);
        }
        console.table(row);
        additionalPrompt();
    });
};










