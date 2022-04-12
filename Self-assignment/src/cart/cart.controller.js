const cartModel = require('./cart.model');

exports.addCartItem = (req, res) => {
    const productsId = req.body.productsId;
    const cartId = req.body.cartId;
    const quantity = req.body.quantity;
    const cartItem = {
        cartId, 
        productsId, 
        quantity
    }
    cartModel.insertCartItem(cartItem, (cartItemId) => {
        if (!cartItemId) {
            res.status(500);
        }
        res.status(200).json(cartItemId);
    });
}

exports.removeCartItem = (req, res) => {
    const productsId = req.body.productsId;
    const cartId = req.body.cartId;
    cartModel.removeCartItem(cartId, productsId, () => {
        res.status(200).send("Successfully remove");
    });
}

exports.updateCartItemQuantity = (req, res) => {
    const productsId = req.body.productsId;
    const cartId = req.body.cartId;
    const quantity = req.body.quantity;
    const cartItem = {
        cartId, 
        productsId, 
        quantity
    }
    cartModel.updateCartItemQuantity(cartItem, () => {
        res.status(200).send("Successfully update");
    });
}


exports.createNewCart = (req, res) => {
    const userId = req.body.userId;
    cartModel.insertCart(userId, (cartId) => {
        if (!cartId) {
            res.status(500);
        }
        res.status(200).json(cartId);
    })
}

exports.getCartItemsByCartIdAndUserId = (req, res) => {
    const cartId = req.query.cartId;
    const userId = req.query.userId;
    cartModel.getCartItemsByCartIdAndUserId(cartId, userId, (cartItems) => {
        if (!cartItems) {
            res.status(200).send("Empty cart");
        } 
        res.status(200).json(cartItems);
    });
}
