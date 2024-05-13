// config.js
const { MongoClient } = require("mongodb");

const username = "**************";
const password = "***************";
const cluster = "**************";
const database = "Assignment";

const dbConnectionFn = async () => {
  const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(mongoURI);
  const db = client.db(database);
  return { client, db };
};

module.exports = { dbConnectionFn };
