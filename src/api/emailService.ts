import axios from "axios";


const sendEmail = async (name: string, email: string, message: string, token: string) => {
	return await axios.post('http://localhost:5000/message', { name, email, message, token });
} 

export default sendEmail;