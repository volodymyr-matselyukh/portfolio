import axios from "axios";


const sendEmail = async (name: string, email: string, message: string) => {
	return await axios.post('http://localhost:5000/message', { name, email, message });
} 

export default sendEmail;