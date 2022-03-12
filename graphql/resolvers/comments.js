const { UserInputError } = require("apollo-server");
const Post = require("../../models/post");
const checkAuth = require("../../utils/checkAuth")

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context) {
            const {userName} = checkAuth(context);
            if(body.trim() === '') throw new UserInputError('Comment could not be empty', {
                errors: {
                    body: 'Comment could not be empty'
                }
            })
            try {
                const post = await Post.findById(postId)
                if(post) {
                    post.comments.unshift({
                        body,
                        userName,
                        createdAt: new Date().toDateString()
                    })
                    await post.save();
                    return post;
                } else {
                    throw new UserInputError('Post not found')
                }
            } catch(err) {
                throw new Error(err)

            }
        }
    },
    async deleteComment(_, {postId, commentId}, context) {
        const {userName} = checkAuth(context);

        try {
            const post = await Post.findById(postId);

            if(post) {
                const commentIndex = await post.comments.findIndex(item => item.id === commentId)
    
                if(post.comments[commentIndex].userName === userName) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
    
                } else {
                    throw new UserInputError('Action not allowed')
    
                }
            } else {
                throw new UserInputError('Post not found')
    
            }
        } catch(err) {
            throw new Error(err) // not recommended to send this to the user as it gives some details about your server app
        }

   
    }
}