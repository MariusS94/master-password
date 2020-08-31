const express = require("express");

const { readPassword, writePassword } = require("../lib/passwords");
const { decrypt, encrypt } = require("../lib/crypto");
const jwt = require("jsonwebtoken");

function createPasswordsRouter(database, masterPassword) {
  const router = express.Router();
  router.get("/:name", async (request, response) => {
    const { name } = request.params;
    const { authToken } = request.cookies;
    const { email } = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log(`Allow access to ${email}`);
    const password = await readPassword(name, database);
    const decryptedPassword = decrypt(password, masterPassword);

    response.send(decryptedPassword);
  });

  router.post("/", async (request, response) => {
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send("Password created");
  });
  return router;
}

module.exports = createPasswordsRouter;
