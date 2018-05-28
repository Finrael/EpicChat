"use strict";
exports.__esModule = true;
var Mongoose = require("mongoose");
var testFunction = function () {
    Mongoose.connect('mongodb://localhost/db');
    var db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("we are in");
        var testSchema = new Mongoose.Schema({ name: String });
        var test = Mongoose.model('testname', testSchema);
        var entry = new test({ name: 'ovidio' });
        console.log(entry.name);
        db.close();
    });
};
testFunction();
