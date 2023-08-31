const User = require("../database/models/user");
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
	const existingUserQuery = User.findOne({ "email": process.env.ADMIN_EMAIL });

	const queryResult = await existingUserQuery.exec();

	if (queryResult) {
		return;
	}

	const result = await bcrypt.hash(process.env.ADMIN_PASS, 10);

	const newUser = new User
		({
			name: "Admin",
			email: process.env.ADMIN_EMAIL,
			password: result
		});

	await newUser.save();
}

const isCredentialsCorrect = async (password, hash) => {
	try {
		const result = await bcrypt.compare(password, hash);

		console.log("comparison result", result);

		return result;
	}
	catch (err) {
		console.error('hash comparison failed', err);

		return false;
	}
}

const getUserNameById = async (id) => {
	const existingUserQuery = User.findOne({ "_id": id }).select({ "name": 1 });

	const queryResult = await existingUserQuery.lean();

	if (queryResult) {
		return queryResult.name;
	}

	return "";
}



module.exports = { createAdminUser, isCredentialsCorrect, getUserNameById };