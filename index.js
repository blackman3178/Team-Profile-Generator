const ask = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const fs = require("fs");


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


generateManager = (data) => {
    console.log(data);
    let {name, id,email, officeNumber} = data;
    const manager = new Manager(name, id, email, officeNumber);
    manager.getRole();
    askToPlayAgain();
}
generateIntern = (data) => {
    let {name,id,email,school} = data;
    const intern = new Intern(name,id,email,school);
    askToPlayAgain();
}

generateEngineer = (data) => {
    let {name,id,email,github} = data;
    const engineer = new Engineer(name,id,email,github);
    askToPlayAgain();
}

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

askForManager();

