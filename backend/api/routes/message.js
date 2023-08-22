const express = require('express');

const router = express.Router();

const Message = require('../models/message');

const sendEmail = require('../../services/EmailService');

router.post("/", (req, res, next) => {

	const params = req.body;

	const message = new Message({
		name: params.name,
		email: params.email,
		message: params.message
	});

	sendEmail(message.name, message.email, message.message);

	message
		.save()
		.then(() => {
			res.status(200).json({
				message: "Success"
			});
		})
		.catch(_ => 
		{
			var errorToThrow = new Error("Internal error");
			errorToThrow.status = 500;
			next(errorToThrow);
		});
});

module.exports = router;