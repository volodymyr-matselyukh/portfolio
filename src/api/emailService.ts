import axios from "axios";
import useAxios from "./agent";

export default function useEmail() {
	const requests = useAxios();

	const sendEmail = async (name: string, email: string, message: string, token: string) => {
		const result = await requests.post('message', { name, email, message, token });
	
		return result;
	} 

	return sendEmail;
}