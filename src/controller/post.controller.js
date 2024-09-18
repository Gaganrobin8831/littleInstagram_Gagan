const User = require('../models/user.model');
const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');

// Create a user
async function HandlePost(req,res) {
    try {
      console.log(req.body);
      
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
      } catch (error) {
        res.status(400).send(error);
      }
}
 // Read all users
async function HandleRead(req,res) {
    try {
        const posts = await Post.find().populate('userId');
        res.status(200).send(posts);
      } catch (error) {
        res.status(500).send(error);
      }
}
 // Update a user
async function HandlePut(req,res) {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
          return res.status(404).send();
        }
        res.status(200).send(post);
      } catch (error) {
        res.status(400).send(error);
      }
}

  // Delete a user
async function HandleDel(req,res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
          return res.status(404).send();
        }

         
      await Like.deleteMany({ postId: post._id });
      
      
      await Comment.deleteMany({ postId: post._id });
    
        res.status(200).send({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(500).send(error);
      }
}

module.exports ={
    HandlePost,
    HandleRead,
    HandlePut,
    HandleDel
}