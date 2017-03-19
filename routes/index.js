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

var tenantSchema = Connection.tenantSchema(Schema);
var tenantModel = mongoose.model('tenant', tenantSchema);

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
    res.end(JSON.stringify(user._id));
});

// Tenant
router.post('/tenant/add', function(req, res, next) {
    var tenant = {
        name: 'jatin kumar',
        category: 'Category',
        domain: 'mydomain@xyz.com',
        creationDate: Date.now(),
        createdBy: 'User',
        status: 'Active'
    };
    var tenant = new userModel(tenant);
    tenant.save();
    console.log(req.body);
    res.end(JSON.stringify(req.body.name));
});
module.exports = router;