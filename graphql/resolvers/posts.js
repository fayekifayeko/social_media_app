
const { AuthenticationError } = require('apollo-server');
const Post  = require('../../models/post.js');
const checkAuth = require('../../utils/checkAuth')
module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort(({createdAt: -1}))
                return posts;
        } catch(e) {
            throw new Error(e)

        }
    },
    async getPost(_,{postId}) {
        try {
            const post = await Post.findById(postId);

            if(!post) {
                throw new Error('Post not found')
            } else {
                return post;
            }
        } catch(err) {
            throw new Error(err)

        }

    }
    },
    Mutation: {
        async createPost(_, {body}, context) {
            const user =  checkAuth(context);
            // no need to check the user as all checks was done into checkAuth function

            const newPost = new Post({
                body,
                user: user.id, // reelationship to User doc
                createdAt: new Date().toISOString(),
                userName: user.userName
            })

            return await newPost.save();

        },
        async deletePost(_, {postId}, context) {
            const user =  checkAuth(context);
            // no need to check the user as all checks was done into checkAuth function

            try {
                const post = Post.findById(postId);
                if(post.userName === user.userName) { // if the user trying to delete the post is the owner
                    await post.delete();

                    return 'Post has been deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err) {
                throw new Error(err);
            }

            return await newPost.save();

        },
    }
}