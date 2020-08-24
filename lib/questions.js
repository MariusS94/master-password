const inquirer = require("inquirer");

const questionsStart = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },

  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: ["Get a password", "Set a password"],
  },
];

const questionsGet = [
  {
    type: "input",
    name: "key",
    message: "Which passsword do you need?",
  },
];

const questionsSet = [
  {
    type: "input",
    name: "key",
    message: "Which Password do you like to set?",
  },

  {
    type: "password",
    name: "password",
    message: "Enter your new password",
  },
];

function askStartQuestion() {
  return inquirer.prompt(questionsStart);
}

function askGetQuestions() {
  return inquirer.prompt(questionsGet);
}

function askSetQuestion() {
  return inquirer.prompt(questionsSet);
}

exports.askStartQuestion = askStartQuestion;
exports.askGetQuestions = askGetQuestions;
exports.askSetQuestion = askSetQuestion;
