const ask = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const fs = require("fs");
 
//arrays to store the team
const internArray = [];
const engineerArray = [];
const managerArray = [];

//questions to ask for manager generation
askForManager = () => {
    console.log("Hello, welcome to the team generator, please enter managerial information when prompted.\n");
    ask.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the managers name?"
        },
        {
            type: "input",
            name: "id",
            message:"What is the managers ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the managers email?"
        },
        {
            type: "input",
            name:"officeNumber",
            message: "What is the managers office number?"
        }
    ]).then(data => {
       generateManager(data);
    });
}

// the three functions below use user inputs to create the corresponding class, then place the object in an array, and ask to make more team members.
generateManager = (data) => {
    let {name, id,email, officeNumber} = data;
    const manager = new Manager(name, id, email, officeNumber);
    managerArray.push(manager);
    generateInitialHTML(manager);
    askToPlayAgain();
}
generateIntern = (data) => {
    let {name,id,email,school} = data;
    const intern = new Intern(name,id,email,school);
    internArray.push(intern);
    askToPlayAgain();
}

generateEngineer = (data) => {
    let {name,id,email,github} = data;
    const engineer = new Engineer(name,id,email,github);
    engineerArray.push(engineer);
    askToPlayAgain();
}

//questions to ask for internn generation
askForIntern = () => {
    console.log("Make an intern");
    ask.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the interns name?"
        },
        {
            type: "input",
            name: "id",
            message:"What is the interns ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the interns email?"
        },
        {
            type: "input",
            name:"school",
            message: "What school does the intern attend?"
        }
    ]).then(data => {
        generateIntern(data);
    });
}

//questions to ask for engineer generation
askForEngineer = () =>{
    console.log("Make an Engineer");
    ask.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the engineers name?"
        },
        {
            type: "input",
            name: "id",
            message:"What is the engineers ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineers email?"
        },
        {
            type: "input",
            name:"github",
            message: "What is the engineers GitHub username?"
        }
    ]).then(data => {
       generateEngineer(data);
    });
}

//asks if the user wants to play again and presents options to make engineer, intern or finish.
askToPlayAgain = () => {
    ask.prompt([
        {
            type: "list",
            name: "choice",
            message: "Pick an option to either continue or finish generating your team.",
            choices: ["Add Engineer", "Add Intern", "Finish Generation"]
        }
    ]).then(data => {
        if (data.choice === "Add Engineer"){
            askForEngineer();
        } else if (data.choice === "Add Intern"){
            askForIntern();
        } else if(data.choice === "Finish Generation"){
            finishGeneration();
        }
    });
}

const initialHTMLText = (manager) => {
     return (`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="./public/style.css">
    </head>
    <body>
        <div>
            <header class="d-flex  justify-content-center py-3 mb-5 bg-danger text-white" >
                <p class="header-text" >My Team</p>
            </header>
        </div>
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-3 align-items-stretch">
                <div class="shadow-lg card bg-secondary pb-3">
                    <div class="card-title bg-primary pb-3 rounded pl-3 text-white">
                        <h2>${manager.getName()}</h2>
                        <h3>${manager.getRole()}</h3>
                    </div>
                    <div class=" bg-secondary container ">
                        <div id="id" class="bg-white border">ID: ${manager.getId()}</div>
                    </div>
                    <div class="  bg-secondary container ">
                        <div id="email" class="bg-white border">Email: ${manager.getEmail()}</div>
                    </div>
                    <div class="  bg-secondary container ">
                        <div id="office-num" class="bg-white border">Office Number: ${manager.getOfficeNumber()}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </body>
    </html>`);
}

generateInitialHTML = (manager) => {
    console.log(manager);
    fs.writeFile("team.html", initialHTMLText(manager), (err) =>
    
    err ? console.log(err) : console.log("Succefully created team.html!"))
}

askForManager();

