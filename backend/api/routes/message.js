const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Message = require('../../database/models/message');

const sendEmail = require('../../services/EmailService');
const handleCaptcha = require('../../services/CaptchaService');

const saveMessage = async (message) => {

	try {
		await message.save();
	}
	catch (error) {
		console.error("Error happened during saving a message.", error);
		throw e;
	}
}

router.post("/", async (req, res, next) => {

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