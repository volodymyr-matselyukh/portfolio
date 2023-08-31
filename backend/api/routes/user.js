const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { isCredentialsCorrect } = require('../../services/UserService');
const { addAuthCookies } = require('../../services/JwtService');

const User = require('../../database/models/user');


async function handleCaptcha(captchaToken) {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captchaToken}`,
		{
			method: 'POST'
		}
	);

	const responseJson = await response.json();

	console.log(responseJson);

	if (!responseJson.success) {
		const captchaError = new Error("Not a human");
		captchaError.status = 400;

		throw captchaError;
	}
}

router.post("/signin", async (req, res, next) => {

	const params = req.body;

	const existingUser = await User.findOne({ email: params.email }).exec();

	if (!existingUser) {
		return res.status(400).json({ "message": "Login or password invalid." });
	}

	const isPasswordCorrect = await isCredentialsCorrect(params.password, existingUser.password);

	if (!isPasswordCorrect) {
		return res.status(400).json({ "message": "Login or password invalid." });
	}

	addAuthCookies(existingUser._id, existingUser.name, res);

	res.status(200).json({
		"message": "Success",
		"data": {
			"userName": existingUser.name
		}
	});

	// const message = new Message({
	// 	name: params.name,
	// 	email: params.email,
	// 	message: params.message
	// });

	// try {
	// 	await handleCaptcha(params.token);
	// }
	// catch (error) {
	// 	return next(error);
	// }

	// await sendEmail(message.name, message.email, message.message);

	// saveMessage(message)
	// 	.then(() => {
	// 		res.status(200).json({
	// 			message: "Success"
	// 		});
	// 	})
	// 	.catch(_ => {
	// 		var errorToThrow = new Error("Internal error");
	// 		errorToThrow.status = 500;
	// 		next(errorToThrow);
	// 	});
});

module.exports = router;