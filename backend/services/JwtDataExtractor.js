const jwt = require('jsonwebtoken');

// const extractTokenDataFromRequest = (req) => {
// 	const token = readTokenFromRequest(req, "jwt");
// 	const refreshToken = readTokenFromRequest(req, "jwt_refresh");

// 	if(!token && !refreshToken)
// 	{
// 		return null;
// 	}

// 	try
// 	{
// 		const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		
// 		return tokenData;
// 	}
// 	catch(err)
// 	{
// 		try{
// 			const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_PRIVATE_KEY);
// 			return refreshTokenData;
// 		}
// 		catch{
// 			console.error("Error verifying both tokens", err);
// 		}
// 	}

// 	return null;
// }

const readTokenFromHeader = (req, tokenName) => {

	return req.header(tokenName);
}

const readTokenFromCookie = (req, tokenName) => {
	if(!req?.cookies)
	{
		return null;
	}

	const token = req.cookies[tokenName];

	return token;
}

module.exports = { readTokenFromHeader, readTokenFromCookie }