const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
userName: String, // required could be handled here or in the graphql layer as it is here
password: String,
createdAt: String,
email: String
})

module.exports = model('User', UserSchema);

