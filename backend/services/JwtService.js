const jwt = require('jsonwebtoken');

const buildJwtToken = (id, name) => jwt.sign(
	{
		id,
		name
	},
	process.env.JWT_PRIVATE_KEY,
	{
		expiresIn: '11m'
	});

const buildJwtRefreshToken = (id, name) => jwt.sign(
	{
		id,
		name
	},
	process.env.JWT_REFRESH_PRIVATE_KEY,
	{
		expiresIn: '1h'
	});

const addJwtCookieToResponse = (token, response) => {
	const jwtCookie = {
		httpOnly: false,
		sameSite: 'Lax', 
		secure: true,
		path: '/',
		maxAge: 1000 * 30 * 1                 /* 10 minutes */
	};

	if(process.env.COOKIE_DOMAIN)
	{
		jwtCookie.domain = process.env.COOKIE_DOMAIN;
	}

	response.cookie('jwt', token, jwtCookie);
}

const addRefreshJwtCookieToResponse = (refreshToken, response) => {
	const jwtRefreshCookie = {
		httpOnly: true,
		sameSite: 'Lax', 
		secure: true,
		path: '/',
		maxAge: 1000 * 60 * 60 * 24 * 400      /* 400 days */
	};

	if(process.env.COOKIE_DOMAIN)
	{
		jwtRefreshCookie.domain = process.env.COOKIE_DOMAIN;
	}

	response.cookie('jwt_refresh', refreshToken, jwtRefreshCookie);
}

const addAuthCookies = (id, name, res) => {
	const token = buildJwtToken(id, name);

	addJwtCookieToResponse(token, res);

	const refreshToken = buildJwtRefreshToken(id, name);

	addRefreshJwtCookieToResponse(refreshToken, res);
}

module.exports = { addAuthCookies };