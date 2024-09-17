const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    postId:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

const Comment = new mongoose.model('Comment',CommentSchema);

module.exports = Comment;
