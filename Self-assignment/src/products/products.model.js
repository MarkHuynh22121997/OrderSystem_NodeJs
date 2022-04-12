const productsQueries = require('./products.queries');
const databasepg = require('../../databasepg');

exports.getProducts = (req, res, callback) => {
	databasepg.pool.query(productsQueries.getProducts, (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows);
	  });
};