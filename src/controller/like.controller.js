const User = require('../models/user.model');
const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');


async function HandlePost(req,res) {
  try {
    const existingLike = await Like.findOne({ userId: req.body.userId });
    if (existingLike) {
      return res.status(400).send({ message: 'User can only like one post at a time' });
    }
    const like = new Like(req.body);
    await like.save();
    res.status(201).send(like);
  } catch (error) {
    res.status(400).send(error);
  }
}



async function HandleDel(req,res) {
  try {
    const like = await Like.findByIdAndDelete(req.params.id);
    if (!like) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Like removed successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports ={
    HandlePost,
  
    HandleDel
}