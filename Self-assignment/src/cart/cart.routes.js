const express = require('express');
const cartRouter = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

const cartController = require('./cart.controller');

cartRouter.get('/', isAuth, cartController.getCartItemsByCartIdAndUserId);
cartRouter.post('/add', isAuth, cartController.addCartItem);
cartRouter.post('/remove', isAuth, cartController.removeCartItem);
cartRouter.post('/create', isAuth, cartController.createNewCart);
cartRouter.post('/update', isAuth, cartController.updateCartItemQuantity);

module.exports = cartRouter;