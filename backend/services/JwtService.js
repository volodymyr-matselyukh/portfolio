const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require("../database/models/token");

const buildJwtToken = async (id, name) => await jwt.sign(
	{
		id,
		name
	},
	process.env.JWT_PRIVATE_KEY,
	{
		expiresIn: '11m'
	});

const buildJwtRefreshToken = async (id, name) => await jwt.sign(
	{
		id,
		name
	},
	process.env.JWT_REFRESH_PRIVATE_KEY,
	{
		expiresIn: '399D'
	});

const addJwtCookieToResponse = (token, response) => {
	const jwtCookie = {
	    httpOnly: false,
		sameSite: 'Lax',
		secure: true,
		path: '/',
		maxAge: 1000 * 60 * 10,                 /* 10 minutes */
		domain: '.matseliukh.com'
	};

	response.cookie('jwt', token, jwtCookie);
}

const addRefreshJwtCookieToResponse = (refreshToken, response) => {
	const jwtRefreshCookie = {
		httpOnly: true,
		sameSite: 'Lax',
		secure: true,
		path: '/',
		maxAge: 1000 * 60 * 60 * 24 * 400,      /* 400 days */
		domain: '.matseliukh.com'
	};

	response.cookie('jwt_refresh', refreshToken, jwtRefreshCookie);
}

const saveRefreshTokenInDb = async (refreshToken, userId) => {
	const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

	const existingTokenIds = await Token.find({
		user: {
			"_id": userId
		}
	}).populate("user", "_id")
	.select("_id")
	.lean();

	if (existingTokenIds.length > 0) {
		const ids = [...existingTokenIds.map(token => token["_id"])];

		console.log("Db contains the previous refresh token for user ", userId, [...ids]);
		
		await Token.deleteMany({ _id: {$in: ids} });
	}

	try {
		console.log("adding new token");

		const newToken = new Token({
			user: userId,
			value: hashedRefreshToken
		});
		
		await newToken.save();
	}
	catch (err) {
		console.error("error storing token", err);
	}
}

const addAuthCookies = async (userId, name, res) => {
	const token = await buildJwtToken(userId, name);

	addJwtCookieToResponse(token, res);

	const refreshToken = await buildJwtRefreshToken(userId, name);

	await saveRefreshTokenInDb(refreshToken, userId);

	addRefreshJwtCookieToResponse(refreshToken, res);
}

module.exports = { addAuthCookies };