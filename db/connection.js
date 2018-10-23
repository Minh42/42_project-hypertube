const mongoose = require('mongoose');
const chalk = require('chalk');
const keys = require('./config/keys');
const MONGO_DB_URI = keys.MONGO_DB_URI;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

module.exports = function () {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_DB_URI, { useMongoClient: true });

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to ", MONGO_DB_URI));
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
}