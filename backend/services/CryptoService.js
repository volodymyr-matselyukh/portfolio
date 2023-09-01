const bcrypt = require('bcryptjs');

const isHashMatch = async (password, hash) => {
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

module.exports = { isHashMatch };