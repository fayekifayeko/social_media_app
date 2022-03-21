const {gql} = require('apollo-server');

module.exports = typeDefs = gql`
type Post {
    id: ID!
    body: String! # ! mark means that the resolver should return it
    createdAt: String!
    userName: String!
    likes: [Like]!
    comments: [Comment]!
    likeCount: Int!
    commentCount: Int!
}
type User {
    token: String!
    email: String!
    id: ID
    userName: String!
    createdAt: String!
}
type Comment {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
}
type Like {
    id: ID!
    createdAt: String!
    userName: String!
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
    getPost(postId: ID!): Post
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String): Post!
    deleteComment(postId: ID!, commentId: ID! ): Post!
    likePost(postId: ID): Post!
}
type Subscription {
    newPost: Post!
}
`