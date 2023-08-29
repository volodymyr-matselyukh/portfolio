const User = require("../database/models/user");
const bcrypt = require('bcryptjs');

const createAdminUser = async () => {
	const existingUserQuery = User.findOne({ "email": process.env.ADMIN_EMAIL });

	const queryResult = await existingUserQuery.exec();

	if(queryResult)
	{
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

const isCredentialsCorrect = async (password, hash) => 
{
	const result = await bcrypt.compare(password, hash);

	console.log("comparison result", result);

	return result;
}

module.exports = { createAdminUser, isCredentialsCorrect };