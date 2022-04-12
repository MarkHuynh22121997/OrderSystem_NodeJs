const cartQueries = require('./cart.queries');
const databasepg = require('../../databasepg');

exports.getCartItemsByCartIdAndUserId = (cartId, userId, callback) => {
	databasepg.pool.query(cartQueries.getCartItemsByCartIdAndUserId, [cartId, userId], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows);
	});
};

exports.getCartItemsByOrderId = (orderId, callback) => {
	databasepg.pool.query(cartQueries.getCartItemsByOrderId, [orderId], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows);
	});
};

exports.getAvailableCart = (userId, callback) => {
	databasepg.pool.query(cartQueries.getAvailableCart, [userId], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	});
};

exports.insertCart = (userId, callback) => {
	databasepg.pool.query(cartQueries.insertCart, [userId, false], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	});
};

exports.insertCartItem = (cartItem, callback) => {
	databasepg.pool.query(cartQueries.insertCartItem, [cartItem.cartId, cartItem.productsId, cartItem.quantity], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	});
};

exports.removeCartItem = (cartId, productsId, callback) => {
	databasepg.pool.query(cartQueries.removeCartItem, [cartId, productsId], (error, results) => {
		if (error) {
			throw error;
		}
		callback();
	});
};

exports.updateCartItemQuantity = (cartItem, callback) => {
	databasepg.pool.query(cartQueries.updateCartItemQuantity, [cartItem.quantity, cartItem.cartId, cartItem.productsId], (error, results) => {
		if (error) {
			throw error;
		}
		callback();
	});
};