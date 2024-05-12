// config.js
const { MongoClient } = require("mongodb");

const username = "kgaurav1173";
const password = "qO8i00lQztkg8yF6";
const cluster = "cluster0.dzfoa3f.mongodb.net";
const database = "Assignment";

const dbConnectionFn = async () => {
  const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(database);
  return { client, db };
};

module.exports = { dbConnectionFn };
