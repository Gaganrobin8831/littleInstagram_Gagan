const express = require('express')

const Likerouter = express.Router()
const {
    HandlePost,
    HandleDel
} = require('../controller/like.controller')

// User CRUD Operations
// Create a user

Likerouter.post('/Like', HandlePost);

  // Delete a user
  Likerouter.delete('/Like/:id', HandleDel);

module.exports = Likerouter