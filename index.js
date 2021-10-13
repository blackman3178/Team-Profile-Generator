const ask = require("inquirer");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const fs = require("fs");


askForManager = () => {
    console.log("Hello, welcome to the team generator, please enter managerial information when prompted.");
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
}

askForManager();