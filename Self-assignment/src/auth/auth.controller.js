const userModel = require('../users/users.model');
const authMethod = require('./auth.method');
const bcrypt = require('bcrypt');
const randToken = require('rand-token')
const jwtVariable = require('../../variables/jwt');

const SALT_ROUNDS = 10;
exports.register = (req, res) => {
	userModel.getUsers(req, res, (users) => {
		if (users.some(u => u.email == req.body.email)) {
			res.status(409).send('Exist email!');
		}
		else {
			req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
			userModel.createUser(req, res, (userId) => {
				if (!userId) {
					res.status(400).send('Error');
				}
				res.status(201).send(userId.toString());
			});
		}
	});
};

exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	userModel.getUserByEmail(email,  async (user) => {
		if (!user) {
			res.status(409).send('Not existed email!');
		}
		else {
			const isPasswordValid = bcrypt.compareSync(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).send('Incorrect password');
			}

			const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

			const dataForAccessToken = {
				email: email,
			};
			const accessToken = await authMethod.generateToken(
				dataForAccessToken,
				accessTokenSecret,
				accessTokenLife,
			);
			if (!accessToken) {
				return res
					.status(401)
					.send('Unsuccessful login, please try again');
			}

			let refreshToken = '';
			if (!user.refreshToken) {
				// Save if not exist in db
				refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // generate random token
				await userModel.updateRefreshToken(user.id, refreshToken, () => {
					res.json({
						msg: 'Successful login',
						accessToken,
						refreshToken,
						user,
					});
				});
			} else {
				// Take refresh token if exist
				refreshToken = user.refreshToken;
				res.json({
					msg: 'Successful login',
					accessToken,
					refreshToken,
					user,
				});
			}
		}
	});
};

exports.refreshToken = async (req, res) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('No access token.');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('No refresh token.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	// Decode access token đó
	const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Unauthorize access token');
	}

	const email = decoded.payload.email; // get email from payload

	userModel.getUserByEmail(email, async (user) => {
		if (!user) {
			return res.status(401).send('Not existed user');
		}
	
		if (refreshTokenFromBody !== user.refreshToken) {
			return res.status(400).send('Unauthorize refresh token.');
		}
	
		// Tạo access token mới
		const dataForAccessToken = {
			email: email,
		};
	
		const accessToken = await authMethod.generateToken(
			dataForAccessToken,
			accessTokenSecret,
			accessTokenLife,
		);
		if (!accessToken) {
			return res
				.status(400)
				.send('Unable to recreate refresh token, please try again');
		}
		return res.json({
			accessToken,
		});
	});
};