require("dotenv").config();
const express = require("express");

const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require("./lib/passwords");
const bodyParser = require("body-parser");
const app = express();
const { encrypt, decrypt } = require("./lib/crypto");

const port = 3000;

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.get("/password/:name", async (request, response) => {
    const { name } = request.params;
    const password = await readPassword(name, database);
    const decryptedPassword = decrypt(password, masterPassword);

    response.send(decryptedPassword);
  });

  app.post("/password", async (request, response) => {
    const { name, value } = request.body;
    const encryptedPassword = encrypt(value, masterPassword);
    await writePassword(name, encryptedPassword, database);
    response.status(201).send("Password created");
  });

  app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
  });
}

main();
