const express = require('express')

const Userrouter = express.Router()
const {
    HandlePost,
    HandleRead,
    HandlePut,
    HandleDel
} = require('../controller/user.controller')

// User CRUD Operations
// Create a user

Userrouter.post('/users', HandlePost);

  // Read all users
  Userrouter.get('/users', HandleRead);

  // Update a user
  Userrouter.put('/users/:id', HandlePut);

  // Delete a user
  Userrouter.delete('/users/:id', HandleDel);

module.exports = Userrouter