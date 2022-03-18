const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const {AuthenticationError} = require('apollo-server');

module.exports = (context) => {
    const header = context.req.headers.authorization;

    if(header) {
        const token = header.split('Bearer ')[1];

        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            }  catch(err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        } else {
            throw new Error('Authentication token must be Bearer [token]')
        }
    } else {
        throw new Error('Authentication headers not provided')
    }
}