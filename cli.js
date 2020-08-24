/* const readlineSync = require("readline-sync");

const password = readlineSync.question("Put in your password ", {
  hideEchoBack: true,
});
console.log(password); */

const inquirer = require(`inquirer`);
const fs = require("fs");

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

const qustionSet = [
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

inquirer.prompt(questionsStart).then((answers) => {
  if (answers.password === "123") {
    console.log("Password is right");
    if (answers.action === "Get a password") {
      inquirer.prompt(questionsGet).then((answers) => {
        try {
          const myPasswords = fs.readFileSync(`./password.json`, `utf8`);
          let data = JSON.parse(myPasswords);
          console.log(`Your ${answers.key} password is ${data[answers.key]}`);
        } catch (error) {
          console.error("Something went wrong");
        }
      });
    } else if (answers.action === "Set a password") {
      inquirer
        .prompt(qustionSet)
        .then((answersSet) =>
          console.log(
            `New Password: ${answersSet.key} to ${answersSet.password}`
          )
        );
    }
  } else {
    console.log("Master password is wrong");
  }
});
