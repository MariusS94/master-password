const fs = require("fs").promises;

async function readPassword(key) {
  const passwordJSON = await fs.readFile(`./password.json`, `utf8`);
  const passwords = JSON.parse(passwordJSON);
  const password = passwords[key];
  return password;
}

exports.readPassword = readPassword;

/* async function writePasswords(passwords) {
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./passwords.json", passwordsJSON);
} */

async function writePassword(key, value) {
  const passwordJSON = await fs.readFile(`./password.json`, `utf8`);
  const passwords = JSON.parse(passwordJSON);
  passwords[key] = value;
  const passwordsJSON = JSON.stringify(passwords, null, 2);
  await fs.writeFile("./password.json", passwordsJSON);
}

exports.writePassword = writePassword;
