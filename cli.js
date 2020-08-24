/* const readlineSync = require("readline-sync");

const password = readlineSync.question("Put in your password ", {
  hideEchoBack: true,
});
console.log(password); */

const inquirer = require(`inquirer`);
const fs = require("fs");

const questions = [
  {
    type: "password",
    name: "password",
    message: "What's your master password?",
  },
  {
    type: "input",
    name: "key",
    message: "Which passsword do you need?",
  },
];

inquirer.prompt(questions).then((answers) => {
  /* console.log(`Your password is ${answers.password}!`); */
  /* console.log(`Would you like to know the password of ${answers.key}?`); */

  if (answers.password === "123") {
    console.log("Password is right");
    try {
      const myPasswords = fs.readFileSync(`./password.json`, `utf8`);
      let data = JSON.parse(myPasswords);
      console.log(`Your ${answers.key} password is ${data[answers.key]}`);
    } catch (error) {
      console.error("Something went wrong");
    }
  } else {
    console.log("Master password is wrong");
  }
});
