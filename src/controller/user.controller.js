const User = require('../models/user.model');
const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');

// Create a user
async function HandlePost(req,res) {
   
        try {
          const user = new User(req.body);
          await user.save();
          res.status(201).send(user);
        } catch (error) {
          res.status(400).send(error);
        }
      
}
 // Read all users
async function HandleRead(req,res) {
   
        try {
          const users = await User.find();
          res.status(200).send(users);
        } catch (error) {
          res.status(500).send(error);
        }
    
}
 // Update a user
async function HandlePut(req,res) {
    
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
          if (!user) {
            return res.status(404).send();
          }
          res.status(200).send(user);
        } catch (error) {
          res.status(400).send(error);
        }
    
}

async function HandleDel(req, res) {
  try {
      // Find and delete the user
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      // Remove user's likes
      await Like.deleteMany({ userId: user._id });
      // Remove user's comments
      await Comment.deleteMany({ userId: user._id });
      // Remove user's posts and associated likes and comments for those posts
      const userPosts = await Post.find({ userId: user._id });
      for (const post of userPosts) {
          // Remove all likes associated with the user's posts
          await Like.deleteMany({ postId: post._id });
          // Remove all comments associated with the user's posts
          await Comment.deleteMany({ postId: post._id });
          // Remove the post itself
          await Post.findByIdAndDelete(post._id);
      }
      res.status(200).send({ message: 'User and related data deleted successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Internal server error', error });
  }
}
module.exports ={
    HandlePost,
    HandleRead,
    HandlePut,
    HandleDel
}