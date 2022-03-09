const {gql} = require('apollo-server');

module.exports = typeDefs = gql`
type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
}
type Query {
    #sayHello: String!  # ! for required
    getPosts: [Post]
}
`