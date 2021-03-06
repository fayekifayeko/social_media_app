const {ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const mongoose = require('mongoose');
const config = require('./config');
const resolvers = require('./graphql/resolvers')

/* const reslovers = { // includes implementation for each typeDef above & includes object Query forQueries typesand object mutation for mutation types
    Query: {
        // sayHello: () => 'Hi there...!'
        getPosts: async () => {
            try {
                const posts = Post.find();
                return posts;
            } catch(e) {
                throw new Error(e)
            }
        } 
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
        } catch(e) {
            throw new Error(e)

        }
    }
}
} */
const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

mongoose.connect(config.MONGODB)
.then(() => {
    console.log('Connection to mongodb succeeded');
    return server.listen({port: 5000}) // it runs express in the background
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})
.catch(e => console.log(e))