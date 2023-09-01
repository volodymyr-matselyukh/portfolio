const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { readTokenFromHeader, readTokenFromCookie } = require("../../services/JwtDataExtractor");

const router = express.Router();
const { getUserNameById } = require('../../services/UserService');
const { isHashMatch } = require('../../services/CryptoService');
const { addAuthCookies } = require('../../services/JwtService');
const handleCaptcha = require('../../services/CaptchaService');
const { validateToken, validateRefreshToken } = require('../middleware/jwtValidator');

const User = require('../../database/models/user');

let refreshingPromise = null;

router.post("/signin", async (req, res, next) => {

	const params = req.body;

	const existingUser = await User.findOne({ email: params.email }).exec();

	if (!existingUser) {
		return res.status(400).json({ "message": "Login or password invalid." });
	}

	const isPasswordCorrect = await isHashMatch(params.password, existingUser.password);

	if (!isPasswordCorrect) {
		return res.status(400).json({ "message": "Login or password invalid." });
	}

	try {
		await handleCaptcha(params.token);
	}
	catch (error) {
		return next(error);
	}

	await addAuthCookies(existingUser._id, existingUser.name, res);

	res.status(200).json({
		"message": "Success",
		"data": {
			"userName": existingUser.name
		}
	});
}); 

router.post("/signout", validateToken, async (req, res, next) => {

	const userId = req.tokenData.id;
	const refreshToken = readTokenFromHeader(req, "jwt_refresh");

	const existingToken = await Token.findOne({ "user": { "_id": userId}}).exec();

	if (!existingToken) {
		res.status(200).json({
			"message": "Refresh token didn't exist"
		});
	}

	const isRefreshTokenMatch = await isHashMatch(refreshToken, existingToken.value);

	const warningMessage = "";

	if (!isRefreshTokenMatch) {
		warningMessage = "Token didn't match in the db";
	}

	await existingToken.remove().exec();

	res.status(200).json({
		"message": "Success",
		"data": {
			"warning": ""
		}
	});
});

router.post("/refresh", validateRefreshToken, async (req, res, next) => {
	console.log("Refreshing token");
	
	const userId = req.refreshTokenData.id;
	const userName = await getUserNameById(userId);
	
	if(!refreshingPromise)
	{
		refreshingPromise = addAuthCookies(userId, userName, res);
	}

	await refreshingPromise;

	refreshingPromise = null;

	return res.status(200).json({
		"message": "Success",
		"data": {
			"userName": userName
		}
	});
});

module.exports = router;