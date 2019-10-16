const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

const uri = global.gConfig.database_uri;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(global.gConfig.dbName);
  // perform actions on the collection object
  client.close();
});