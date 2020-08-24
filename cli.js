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

async function main() {
  const { password, action } = await inquirer.prompt(questionsStart);

  if (password === "123") {
    console.log("Password is right");
    if (action === "Get a password") {
      const { key } = await inquirer.prompt(questionsGet);
      try {
        const myPasswords = fs.readFileSync(`./password.json`, `utf8`);
        let data = JSON.parse(myPasswords);
        console.log(`Your ${key} password is ${data[key]}`);
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (action === "Set a password") {
      const { key, password } = await inquirer.prompt(questionsSet);
      console.log(`New Password: ${key} to ${password}`);
    }
  } else {
    console.log("Master password is wrong");
  }
}
main();
