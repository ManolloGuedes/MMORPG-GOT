const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

const connection = (dados) => {
  client.connect(err => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(process.env.DB_NAME);
    // perform actions on the collection object
    query(db, dados);
    client.close();
  });
}

function query(db, dados) {
  var collection = db.collection(dados.collection);
  switch(dados.operacao) {
    case 'inserir':
      collection.insertOne(dados.usuario, dados.callback);
      break;
    case 'buscar':
      collection.find(dados.usuario).toArray(dados.callback);
      break;
    default:
      break;
  }
}

module.exports = () => {
  return connection
};