const {gql} = require('apollo-server');

module.exports = typeDefs = gql`
type Post {
    id: ID!
    body: String! # ! mark means that the resolver should return it
    createdAt: String!
    userName: String!
}
type User {
    token: String!
    email: String!
    id: ID
    userName: String!
    createdAt: String!
}
input RegisterInput { #input is a special type
userName: String!
password: String!
confirmPassword: String!
email: String!
}
type Query {
    #sayHello: String!  # ! for required
    getPosts: [Post]
}
type Mutation {
    register(registerInput: RegisterInput): User
}
`