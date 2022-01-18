var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');



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

function viewDepartments(){
    
}



// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test'
//   });


// inquirer
//   .prompt([
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });