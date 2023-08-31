import { store } from "../stores/store";
import useAxios from "./agent";

export default function useLogin(){
	const {userStore} = store;
	const {setName, login: userStoreLogin, logout} = userStore;

	const requests = useAxios();

	const login = async (email: string, password: string) => {
		const result: any = await requests.post_original('user/signin', { email, password }, { withCredentials: true });
		
		console.log("result", result);

		if(result.data.message === "Success")
		{
			setName(result.data.data.userName);
			userStoreLogin();
		}
	}
	
	return {login, logout};
}

