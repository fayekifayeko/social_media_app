const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const config = require('./config');

const typeDefs = gql`
type Query {
    sayHello: String!  # ! for required
}
`

const reslovers = { // includes implementation for each typeDef above & includes object Query forQueries typesand object mutation for mutation types
    Query: {
        sayHello: () => 'Hi there...!'
    }
}
const server = new ApolloServer({
    typeDefs,
    reslovers
});

mongoose.connect(config.url)
.then(() => {
    console.log('Connection to mongodb succeeded');
    return server.listen({port: 5000}) // it runs express in the background
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})