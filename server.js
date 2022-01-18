var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const express = require('express');
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
const db = require('./db/connection.js');

function promptUser () {
inquirer.prompt([
    {
        type: 'list',
        name: 'choiceSelect',
        message: 'Welcome!  What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'End Session']
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





