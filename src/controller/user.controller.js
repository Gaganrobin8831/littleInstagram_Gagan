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
 async function HandleRead(req, res) {
  try {
    const users = await User.find()
      .populate('posts')
      .populate('comments')
      .populate('likes');

    // Map through the users to add counts
    const usersWithCounts = users.map(user => ({
      ...user.toObject(), // Convert Mongoose document to plain object

   TotalDetail:"THE USER DETAIL",
      USERNAME:user.name,
      postCount: user.posts.length,
      commentCount: user.comments.length,
      likeCount: user.likes.length,
    }));

    res.status(200).send(usersWithCounts);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function HandleReadById(req, res) {
  try {
    const id = req.params.id;
    // console.log({ id });
    
    const user = await User.findById(id)
      .populate('posts')
      .populate('comments')
      .populate('likes');

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Create the response object with counts
    const userWithCounts = {
      ...user.toObject(), // Convert Mongoose document to plain object
      TotalDetail: "THE USER DETAIL",
      USERNAME: user.name,
      postCount: user.posts.length,
      commentCount: user.comments.length,
      likeCount: user.likes.length,
    };

    res.status(200).send(userWithCounts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: "Server error", error });
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
   
      
      await Like.deleteMany({ userId: user._id });
      
      
      await Comment.deleteMany({ userId: user._id });
    
      
      const userPosts = await Post.find({ userId: user._id });

      for (const post of userPosts) {
         
        
          await Like.deleteMany({ postId: post._id });
        
          
          await Comment.deleteMany({ postId: post._id });
         
          
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
    HandleDel,
    HandleReadById
}