
const { AuthenticationError } = require('apollo-server');
const Post  = require('../../models/post.js');
const checkAuth = require('../../utils/checkAuth')
module.exports = {
    Post: { // each query, mutation or subscription that includes Post would execute this and includes them inside its resp
        likeCount:(parent) => parent.likes.length, // parent is the query, mutation or subscription that executes this
        commentCount(parent) {
            return  parent.comments.length;
        }
    },
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
            if(body.trim() === '') throw new UserInputError('Post could not be empty', {
                errors: {
                    body: 'Post could not be empty'
                }
            })
            const newPost = new Post({
                body,
                user: user.id, // reelationship to User doc
                createdAt: new Date().toISOString(),
                userName: user.userName
            })

            const post =  await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;

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
        },
        async likePost(_, {postId}) {
            const user =  checkAuth(context);

            try {

                const post = await Post.findById(postId);

                if(post) {
                    if(post.likes.find(item => item.userName ===userName)) { // already user liked the post, unlike it!
                        post.comments.filter(item => item.userName !==userName)
                    } else {
                        post.comments.push({
                            userName,
                            createdAt: new Date().toISOString()
                        })
                    }
                } else {
                    throw new AuthenticationError('Post not found')
    
                }
                await post.save();

                return post();
            } catch(err){
                throw new Error(err)

            }

        },
    },
    Subscription: {  // listen to NEW_POST event
        newPost: {
            // subscribe: (parent,args,context) => pubsub.asyncIterator('NEW_POST')

            subscribe: (_,_,{pubsub}) => pubsub.asyncIterator('NEW_POST')
        }
    }
}