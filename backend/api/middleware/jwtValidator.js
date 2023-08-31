const jwt = require('jsonwebtoken');
const {readTokenFromRequest} = require("../../services/JwtDataExtractor");

const {getUserNameById} = require("../../services/UserService");
const {addAuthCookies} = require("../../services/JwtService");

const validateAndRefreshTokens = async (req, res) => {
	const token = readTokenFromRequest(req, "jwt");
	const refreshToken = readTokenFromRequest(req, "jwt_refresh");

	if(!refreshToken)
	{
		//Unauthorized user, neither token check nor access token renewal needed
		return;
	}

	try
	{
		const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		req.tokenData = tokenData;
	}
	catch
	{
		//trying renew token from refresh token
		try
		{
			console.log("refreshing token");
			const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_REFRESH_PRIVATE_KEY);
			const userId = refreshTokenData.id;

			const userName = await getUserNameById(userId);

			addAuthCookies(userId, userName, res);
		}
		catch (err){
			console.error("Error verifying both access and refresh tokens");
			throw err;
		}
	}
}

const validateToken = async (req, res, next) => {
	
	try{
		validateAndRefreshTokens(req);
	}
	catch(err)
	{
		console.error(err);
		return res.status(401).json({"message": "Authentication failed"});
	}

	next();
}

module.exports = {validateToken,validateAndRefreshTokens};