const express = require('express')

const Postrouter = express.Router()
const {
    HandlePost,
    HandleRead,
    HandlePut,
    HandleDel
} = require('../controller/post.controller')

// User CRUD Operations
// Create a user

Postrouter.post('/Post', HandlePost);

  // Read all users
  Postrouter.get('/Post', HandleRead);

  // Update a user
  Postrouter.put('/Post/:id', HandlePut);

  // Delete a user
  Postrouter.delete('/Post/:id', HandleDel);

module.exports = Postrouter