var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: String,
    userName: String,
    createdAt: String,
    comments: [
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userName: String,
            createdAt: String // not necessary
        }
    ],
    user: { // not necessary
        type: Schema.Types.ObjectId,
        ref: 'users' // users collection is where the user models saved
    }
})

module.exports =  mongoose.model('Post', PostSchema);