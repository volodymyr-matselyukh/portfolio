const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (fromName, fromEmail, text) => 
{
	const msg = {
		to: 'volodymyr.matselyukh@gmail.com',
		from: 'portfolio@gmail.com', // Use the email address or domain you verified above
		subject: `Volodymyr, you have a message from your portfolio website. ${fromName} is writting you from ${fromEmail}`,
		text
	};

	await sgMail.send(msg);
}

module.exports = sendEmail;