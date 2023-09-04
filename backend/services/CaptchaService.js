const fetch = require("node-fetch");

const handleCaptcha = async (captchaToken) => {
	const response = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captchaToken}`,
		{
			method: 'POST'
		}
	);

	const responseJson = await response.json();

	if (!responseJson.success) {
		const captchaError = new Error("Not a human");
		captchaError.status = 400;

		throw captchaError;
	}
}

module.exports = handleCaptcha;