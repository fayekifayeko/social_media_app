const User  = require('../../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config');
const {UserInputError}  = require('apollo-server');
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators');


const generateToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
        email: user.email
    },
    SECRET_KEY,
    {expiresIn: '1h'}
    )

    return token;
}

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

                const { valid, errors } = validateRegisterInput(
                    userName,
                    password,
                    confirmPassword,
                    email,

                  );
                  if (!valid) {
                    throw new UserInputError('Errors', { errors });
                  }

                const oldUser = await User.findOne({userName})

                if(oldUser) {
                    throw new UserInputError('user is already exists', {
                        errors: {
                            userName: 'This user name is already taken'
                        }
                    })
                }

                if(password !== confirmPassword) {

                }

                    password = await bcrypt.hash(password, 12);
                   const newUser = new User({
                    userName,
                    password,
                    email,
                    createdAt: new Date().toISOString()
                   })
                   const res = await newUser.save();

                   const token = generateToken(res);

                   return {
                     ...res._doc,
                     id: res._id,
                     token
                   };
                   
               },
    async login(parent, {userName, password}, context, info) {
        console.log('errorrr')

        const { valid, errors } = validateLoginInput(
            userName,
            password
          );
          console.log('errorrr')

          if (!valid) {
              console.log('errorrr')
            throw new UserInputError('Errors', { errors });
          }

          const user = await User.findOne({userName});

          if(!user) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', {errors})
          }

          const match = await bcrypt.compare(password, user.password);

          if(!match) {
            errors.general = 'Wrong credentials';
            throw new UserInputError('Wrong credentials', {errors})
          }

          const token = generateToken(user);

                   return {
                     ...user._doc,
                     id: user._id,
                     token
                   };
    }
}
}
