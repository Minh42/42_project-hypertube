const mongoose = require('mongoose');
const chalk = require('chalk');
const keys = require('./config/keys');
const mongoURI = keys.mongoURI;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

mongoose.connect(mongoURI, {useCreateIndex: true, useNewUrlParser: true});

mongoose.connection.on('connected', function () {
    console.log(connected("Mongoose default connection is open to ", mongoURI));
});

mongoose.connection.on('error', function(err) {
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function (){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

module.exports = mongoose;