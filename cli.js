const { readPassword } = require("./lib/readpassword");
const {
  askStartQuestion,
  askGetQuestions,
  askSetQuestion,
} = require("./lib/questions");

async function main() {
  const { password, action } = await askStartQuestion();
  if (password === "123") {
    console.log("Password is right");
    if (action === "Get a password") {
      const { key } = await askGetQuestions();
      try {
        const password = await readPassword(key);
        console.log(`Your ${key} password is ${password}`);
      } catch (error) {
        console.error("Something went wrong");
      }
    } else if (action === "Set a password") {
      const { key, password } = await askSetQuestion();
      console.log(`New Password: ${key} to ${password}`);
    }
  } else {
    console.log("Master password is wrong");
  }
}
main();
