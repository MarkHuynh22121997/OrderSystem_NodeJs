const express = require('express');
const usersRouter = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

const usersController = require('./users.controller');

usersRouter.get('/', isAuth, usersController.getUsers);
usersRouter.post('/create', isAuth, usersController.createUser);

module.exports = usersRouter;