const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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

const saveMessage = async (message) => {

	try {
		const connectionUri = 'mongodb+srv://volodymyrmatselyukh:' + process.env.MONGO_ATLAS_PW + '@portfolio.m8gvq5q.mongodb.net?retryWrites=true&w=majority';

		mongoose.connect(connectionUri, { 
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		await message.save();
	}
	catch (error) {
		console.error("Error happened during saving a message.", error);
		throw e;
	}
}

router.post("/signin", async (req, res, next) => {

	const params = req.body;

	const message = new Message({
		name: params.name,
		email: params.email,
		message: params.message
	});

	try {
		await handleCaptcha(params.token);
	}
	catch (error) {
		return next(error);
	}

	await sendEmail(message.name, message.email, message.message);

	saveMessage(message)
		.then(() => {
			res.status(200).json({
				message: "Success"
			});
		})
		.catch(_ => {
			var errorToThrow = new Error("Internal error");
			errorToThrow.status = 500;
			next(errorToThrow);
		});
});

module.exports = router;