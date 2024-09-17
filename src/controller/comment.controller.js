const User = require('../models/user.model');
const Post = require('../models/post.model');
const Like = require('../models/like.model');
const Comment = require('../models/comment.model');


async function HandlePost(req,res) {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}


async function HandleRead(req,res) {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function HandlePut(req,res) {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comment) {
      return res.status(404).send();
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
}



async function HandleDel(req,res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Comment deleted successfully' });
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