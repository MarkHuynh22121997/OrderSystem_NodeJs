const userModel = require('../users/users.model');
const authMethod = require('./auth.method');

exports.isAuth = async (req, res, next) => {
	// Get access token from header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Not found access token');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send('Unauthorized');
	}

	userModel.getUserByEmail(verified.payload.email, (user) => {
        req.user = user;
        return next();
    });
};