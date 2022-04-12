const express = require('express');
const inventoryRouter = express.Router();
const authMiddleware = require('../auth/auth.middlewares');
const isAuth = authMiddleware.isAuth;

const inventoryController = require('./inventory.controller');

inventoryRouter.get('/', isAuth, inventoryController.getProductsInventoryByProductsId);
inventoryRouter.get('/all', isAuth, inventoryController.getAllProductsInventoryByProductsId);

module.exports = inventoryRouter;