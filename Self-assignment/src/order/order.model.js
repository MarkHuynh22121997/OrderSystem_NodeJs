const orderQueries = require('./order.queries');
const databasepg = require('../../databasepg');

exports.insertOrder = (order, callback) => {
	databasepg.pool.query(orderQueries.insertOrder, [order.cartId, order.amount], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	});
};

exports.payOrder = (orderId, callback) => {
	databasepg.pool.query(orderQueries.payOrder, [orderId], (error, results) => {
		if (error) {
			throw error;
		}
		callback();
	});
};