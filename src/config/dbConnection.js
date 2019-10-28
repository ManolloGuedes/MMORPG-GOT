const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.DB_URI;

class Database {
  constructor() {
    this._connect()
  }
  
  _connect() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful');

        mongoose.connection.on('connected', function(){
          console.log(connected("Mongoose default connection is open to ", dbURL));
        });

        mongoose.connection.on('error', function(err){
            console.log(error("Mongoose default connection has occured "+err+" error"));
        });

        mongoose.connection.on('disconnected', function(){
            console.log(disconnected("Mongoose default connection is disconnected"));
        });

        process.on('SIGINT', function(){
            mongoose.connection.close(function(){
                console.log(termination("Mongoose default connection is disconnected due to application termination"));
                process.exit(0)
            });
        });
      })
      .catch(err => {
        console.error('Database connection error')
      });
  }
}

module.exports = new Database();