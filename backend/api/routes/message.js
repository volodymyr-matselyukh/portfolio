const express = require('express');

const router = express.Router();

const Message = require('../models/message');

const sendEmail = require('../../services/EmailService');

async function handleCaptcha(captchaToken) {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captchaToken}`,
		{
			method: 'POST'
		}
	);

	const responseJson = await response.json();

	if (!responseJson.success) {
		const captchaError = new Error("Not a human");
		captchaError.status = 400;

		res.send(captchaError);
	}
}

router.post("/", async (req, res, next) => {

	const params = req.body;

	const message = new Message({
		name: params.name,
		email: params.email,
		message: params.message
	});

	await handleCaptcha(params.token);

	sendEmail(message.name, message.email, message.message);

	message
		.save()
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