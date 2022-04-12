const userQueries = require('./users.queries');
const databasepg = require('../../databasepg');

exports.getUsers = (req, res, callback) => {
	databasepg.pool.query(userQueries.getUsers, (error, results) => {
		if (error) {
			throw error;
		}
		users = results.rows;
		callback(results.rows);
	  });
};

exports.getUserByEmail = (email, callback) => {
	databasepg.pool.query(userQueries.getUserByEmail, [email], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0]);
	  });
};

exports.createUser = (req, res, callback) => {
	const { name, email,  password, role} = req.body;
	databasepg.pool.query(userQueries.insertUser, [name, email, password, role], (error, results) => {
		if (error) {
			throw error;
		}
		callback(results.rows[0].id);
	  });
};

exports.updateRefreshToken = async (userId, refreshToken, callback) => {
	databasepg.pool.query(userQueries.updateRefreshToken, [refreshToken, userId ], (error, results) => {
		if (error) {
			throw error;
		}
		callback();
	  });
};