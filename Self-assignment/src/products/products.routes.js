const express = require('express');
const productsRouter = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

const productsController = require('./products.controller');

productsRouter.get('/', isAuth, productsController.getProducts);

module.exports = productsRouter;