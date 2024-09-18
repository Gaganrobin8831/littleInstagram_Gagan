const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


UserSchema.virtual('posts', {
    ref: 'Post', 
    localField: '_id', 
    foreignField: 'userId' 
});

UserSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'userId'
});

UserSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'userId'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
