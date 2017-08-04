var express = require('express');
var router = express.Router();

//Connection to mongodb
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/pta');
var Schema = mongoose.Schema;
var Connection = require('../config/connection');

// Web Token
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = "mysecretkey";

// Import schemas
var userSchema = Connection.userSchema(Schema);
var userModel = mongoose.model('user', userSchema);

var tenantSchema = Connection.tenantSchema(Schema);
var tenantModel = mongoose.model('tenant', tenantSchema);

// Import Controllers
var authenticationController = require('../controller/authentication-controller');

// Routing starts from here
// Authentication
// Validate Token 
router.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode) {
            if(err) {
                res.status(500).end("Invalid Token");
            } else {
                // next();
            }
        });
        console.log('Token Created');
    } else {
        console.log('Please send a token');
    }
    next();
});
// router.post('/auth/user', authenticationController.authenticate);
router.post('/auth/user', function(req, res, next) {
    // TODO: Validate login from the DB
    var user = req.body;
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: 4000
    });
    var record = {
        userName: user.userName, 
        token: token
    };
    res.end(JSON.stringify(record));
});


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
    var tenant = new tenantModel(tenant);
    tenant.save();
    console.log(req.body);
    res.end(JSON.stringify(req.body.name));
});

// Get all tenant list
router.get('/tenant/all', function(req, res, next) {
    var data = tenantModel.find({});
    data.then(function(record) {
        res.end(JSON.stringify(record));
    });
});
module.exports = router;