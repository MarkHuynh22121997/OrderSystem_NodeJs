const inventoryQueries = require('./inventory.queries');
const databasepg = require('../../databasepg');

exports.updateInventory = (quantity, productsId, callback) => {
	databasepg.pool.query(inventoryQueries.updateInventory, [quantity, productsId], (error, results) => {
		if (error) {
			throw error;
		}
		callback();
	});
};

exports.getProductsInventory = (productsId, callback) => {
	databasepg.pool.query(inventoryQueries.getProductsInventory, [productsId], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	});
};

exports.getAllProductsInventory = (callback) => {
	databasepg.pool.query(inventoryQueries.getAllProductsInventory, (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows);
	});
};