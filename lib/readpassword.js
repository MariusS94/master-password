const fs = require("fs").promises;

async function readPassword(key) {
  const passwordJSON = await fs.readFile(`./password.json`, `utf8`);
  const passwords = JSON.parse(passwordJSON);
  const password = passwords[key];
  return password;
}

exports.readPassword = readPassword;
