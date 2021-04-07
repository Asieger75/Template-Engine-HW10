const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { generate } = require("rxjs");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//incrediblesIt'sShowtime.gif

//establish array
var crew = [];
var Employee = [
    {
        type: "list",
        name: "role",
        message: "Select the position of the worker you are adding to your crew from the following options",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "We're done here",

        ],
    },
];

//create form queries for MANAGER rank
var manQuestions = [
    {
        type: "input",
        message: "What's the MANAGER'S name?",
        name: "name",

    },

    {
        type: "input",
        message: "What is the MANAGER'S ID number?",
        name: "id",

    },

    {
        type: "input",
        message: "What email can the MANAGER be reach @?",
        name: "emailAddress",

    },

    {
        type: "input",
        message: "What's the MANAGER'S office #?",
        name: "officeNum",

    },
];

//create form queries for ENGI rank
var engiQuestions = [

    {
        type: "input",
        message: "What's the Engineer's name?",
        name: "name",

    },

    {
        type: "input",
        message: "What is the Engineer's ID number?",
        name: "id",

    },

    {
        type: "input",
        message: "What email can the Engineer be reach @?",
        name: "emailAddress",

    },

    {
        type: "input",
        message: "What's the Engineer's github handle?",
        name: "github",

    },
];

//last and kinda least, it's the intern's turn
var internQuestions = [

    
    {
        type: "input",
        message: "What's the Intern's name?",
        name: "name",

    },

    {
        type: "input",
        message: "What is the Intern's ID number?",
        name: "id",

    },

    {
        type: "input",
        message: "What email can the Intern be reach @?",
        name: "emailAddress",

    },

    {
        type: "input",
        message: "What's the Intern's school or org of origin?",
        name: "school",

    },
];

    createCrew();
  
  function createCrew() {
    inquirer.prompt(Employee)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .then(function (response) {
        if (response.role === 'Engineer') {
          inquirer.prompt(engiQuestions).then((response) => {
            console.log(response);
  
            let newEngi = new Engineer(
              response.name,
              response.id,
              response.emailAddress,
              response.github,
            );
            crew.push(newEngi);
            createCrew();
          });
  
    } else if (response.role === 'Manager') {
          inquirer.prompt(manQuestions).then((response) => {
            console.log(response);
  
            let newMan = new Manager(
              response.name,
              response.id,
              response.emailAddress,
              response.officeNum,
            );
            crew.push(newMan);
            createCrew();
          });
  
    } else if (response.role === 'Intern') {
          inquirer.prompt(internQuestions).then((response) => {
            console.log(response);
  
            let newInt = new Intern(
              response.name,
              response.id,
              response.emailAddress,
              response.school,
            );
            crew.push(newInt);
            createCrew();
          });
  
          // html writer
        } else {
          let main = render(crew);
          fs.writeFile(outputPath, main, (err) => {
            if (err) throw err;
            console.log('Roster has been created. Check the roster.html file')
          });
        }
      });
  }


