const jwt = require('jsonwebtoken');

const extractTokenDataFromRequest = (req) => {
	const token = readTokenFromRequest(req, "jwt");

	if(!token)
	{
		return null;
	}

	try
	{
		const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		
		return tokenData;
	}
	catch(err)
	{
		console.error("Error verifying token", err);
	}

	return null;
}

const readTokenFromRequest = (req, tokenName) => {
	if(!req?.cookies)
	{
		return null;
	}

	const token = req.cookies[tokenName];

	return token;
}

module.exports = { extractTokenDataFromRequest, readTokenFromRequest }