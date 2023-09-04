const jwt = require('jsonwebtoken');
const {readTokenFromHeader, readTokenFromCookie} = require("../../services/JwtDataExtractor");
const { isHashMatch } = require('../../services/CryptoService');

const Token = require('../../database/models/token');

const validateToken = async (req, res, next) => {

	try{
		const token = readTokenFromHeader(req, "Authorization");

		const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

		req.tokenData = tokenData;
	}
	catch(err)
	{
		console.error("Jwt validation error");
		return res.status(401).json({"message": "Authentication failed"});
	}

	next();
}

const validateRefreshToken = async (req, res, next) => {

	try{
		const refreshToken = readTokenFromCookie(req, "jwt_refresh");

		const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_PRIVATE_KEY);

		const userId = refreshTokenData.id;

		const existingToken = await Token.findOne({ "user": { "_id": userId}}).exec();
	
		if (!existingToken) {
			return res.status(400).json({
				"message": "Refresh token invalid"
			});
		}
	
		const isRefreshTokenMatch = await isHashMatch(refreshToken, existingToken.value);
	
		if (!isRefreshTokenMatch) {
			return res.status(400).json({
				"message": "Refresh token invalid"
			});
		}

		req.refreshTokenData = refreshTokenData;
	}
	catch(err)
	{
		console.error("Validate refresh token error", err);
		return res.status(400).json({"message": "Refresh token invalid"});
	}

	next();
}

module.exports = {validateToken, validateRefreshToken};