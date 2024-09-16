const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    userId:[{
        type:mongoose.Types.ObjectId,
        ref:'User',
        unique:true
    }],
    postId:{
        type:mongoose.Types.ObjectId,
        ref:'Post'
    }
},{timestamps:true})

const Like = new mongoose.model('Like',LikeSchema)

module.exports = Like;