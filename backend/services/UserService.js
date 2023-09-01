const User = require("../database/models/user");

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

const getUserNameById = async (id) => {
	const existingUserQuery = User.findOne({ "_id": id }).select({ "name": 1 });

	const queryResult = await existingUserQuery.lean();

	if (queryResult) {
		return queryResult.name;
	}

	return "";
}



module.exports = { createAdminUser, getUserNameById };