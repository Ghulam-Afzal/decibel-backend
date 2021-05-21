const audioRouter = require("express").Router();
const AudioTodo = require("../models/todoModel");
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


// retrieve token 
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// routes // 

// get all todos 
audioRouter.get("/", async (req, res) => {
  const todos = await AudioTodo.find({}).populate("user", { username: 1, name: 1 })
    res.json(todos)
});

// get a tod by id 
audioRouter.get('/:id', async (req, res) => {
    const todo = await AudioTodo.findById(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
})

// create a new todo 
audioRouter.post("/", async (req, res) => {
  const todoContent = req.body;
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, config.SECRET)
  
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token is missing or is invalid' })
  }

  const user = await User.findById(todoContent.userId)
  
  const audioTodo = new AudioTodo({
    title: todoContent.title,
    content: todoContent.content,
    date: new Date(),
    user: user._id
  });

  const savedTodo = await audioTodo.save()
  user.notes = user.notes.concat(savedTodo._id)
  await user.save()

  res.json(savedTodo)
});

// sete a todo by id 
audioRouter.delete('/:id', async (req, res) => {
    await AudioTodo.findByIdAndDelete(req.params.id)
        .res.status(204).end()
}); 

// update a todo 
audioRouter.put('/:id', (req, res, next) => {
    const info = req.body

    const todo = {
        title: info.title
    }

    AudioTodo.findByIdAndUpdate(req.params.id, todo, { new: true })
        .then(updatedTodo => {
            res.json(updatedTodo)
        })
        .catch(error => next(error))
})




module.exports = audioRouter