const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });

// // Create a compound index to ensure unique combinations of userId and postId
LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
