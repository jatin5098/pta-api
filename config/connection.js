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

module.exports = {
    userSchema: userSchema
};