var authenticate = function(req, res, next) {
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
};
module.exports = {
    authenticate: authenticate
};