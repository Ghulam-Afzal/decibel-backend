const config = require('./utils/config')
const http = require("http");
const express = require("express");
require('express-async-errors')
const app = express();
const cors = require("cors");
const todoRouter = require('./controllers/routes'); 
const usersRouter = require('./controllers/signup')
const loginRouter = require('./controllers/signin')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require("mongoose");

// set up connection to local mongo db 
mongoose
  .connect(config.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

// use middle ware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/audioTodos', todoRouter); 
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app


