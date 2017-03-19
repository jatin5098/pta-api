var userSchema = function(Schema) {
    return new Schema({
        userName: { type: String, required: true },
        displayName: String,
        password: String,
        creationDate: String,
        status: String
    }, { collection: 'user' });
};
var user = {
    userName: 'jatin.kumar',
    displayName: 'Jatin kumar',
    password: 'password@1234',
    creationDate: Date.now(),
    status: 'Active'
};
// Tenant Schema
var tenantSchema = function(Schema) {
    return new Schema({
        name: String,
        category: String,
        domain: String,
        creationDate: String,
        createdBy: String,
        status: String
    }, { collection: 'tenant' });
};
module.exports = {
    userSchema: userSchema,
    tenantSchema: tenantSchema
};