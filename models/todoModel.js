const mongoose = require("mongoose");

// schema for audio todo
const audioTodo = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

audioTodo.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model("AudioTodo", audioTodo);