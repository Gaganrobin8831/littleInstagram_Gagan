const express = require('express')

const Commentrouter = express.Router()
const {
    HandlePost,
    HandleRead,
    HandlePut,
    HandleDel
} = require('../controller/comment.controller')

// User CRUD Operations
// Create a user

Commentrouter.post('/comment', HandlePost);

  // Read all users
  Commentrouter.get('/comment', HandleRead);

  // Update a user
  Commentrouter.put('/comment/:id', HandlePut);

  // Delete a user
  Commentrouter.delete('/comment/:id', HandleDel);

module.exports = Commentrouter