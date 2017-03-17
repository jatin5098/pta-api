var express = require('express');
var router = express.Router();

//Connection to mongodb
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/pta');
var Schema = mongoose.Schema;
var Connection = require('../config/connection');

// Import schemas
var userSchema = Connection.userSchema(Schema);
var userModel = mongoose.model('user', userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'pta api' });
});

//Create Temporary User
router.get('/user/create', function(req, res, next) {
    var user = {
        userName: 'jatin.kumar',
        displayName: 'Jatin kumar',
        password: 'password@1234',
        creationDate: Date.now(),
        status: 'Active'
    };
    var user = new userModel(user);
    user.save();
    res.end(JSON.stringify(user));
});
module.exports = router;