import axios from "axios";


const sendEmail = async (name: string, email: string, message: string, token: string) => {
	const result = await axios.post('https://matseliukh-portfolio-back-end.fly.dev/message', { name, email, message, token });

	console.log(result);

	return result;
} 

export default sendEmail;