const User  = require('../../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config');
const {UserInputError}  = require('apollo-server');

module.exports = {
    Mutation: {
        // register(parent, args, context, info)
       async register(
            parent,
             {
                 registerInput: {userName, password, confirmPassword, email}
                },
              context,
               info
               ) {

                const oldUser = await User.findOne({userName})

                if(user) {
                    throw new UserInputError('user is already exists', {
                        errors: {
                            userName: 'This user name is already taken'
                        }
                    })
                }

                if(password !== confirmPassword) {

                }

                if(RegExp.lastMatch())
                    password = await bcrypt.hash(password, 12);
                   const newUser = new User({
                    userName,
                    password,
                    email,
                    createdAt: new Date().toISOString()
                   })
                   const user = await newUser.save();
                   const token = jwt.sign({
                       id: user._id,
                       userName: user.userName,
                       email: user.email
                   },
                   SECRET_KEY,
                   {expiresIn: '1h'}
                   )

                   return {
                       ...user.doc,
                       id: user._id,
                       token
                   }
               }
    }
}
