require("dotenv").config();
const express = require("express");

const { MongoClient } = require("mongodb");

const bodyParser = require("body-parser");
const app = express();

const createPasswordsRouter = require("./routes/password");

const port = 3000;

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

async function main() {
  await client.connect();
  const database = client.db(process.env.MONGO_DB_NAME);
  const masterPassword = process.env.MASTER_PASSWORD;

  app.use(bodyParser.json());
  app.use("/api/password", createPasswordsRouter(database, masterPassword));

  app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
  });
}

main();
