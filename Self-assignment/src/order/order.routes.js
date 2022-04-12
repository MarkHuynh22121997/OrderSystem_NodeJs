const express = require('express');
const orderRouter = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

const orderController = require('./order.controller');

orderRouter.get('/', orderController.getCartItemsByOrderId); 
orderRouter.post('/create', isAuth, orderController.createOrder);
orderRouter.post('/pay', isAuth, orderController.payOrder);

module.exports = orderRouter;