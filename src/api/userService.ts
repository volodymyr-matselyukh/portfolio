import { store } from "../stores/store";
import useAxios from "./agent";

export default function useLogin(){
	const {userStore} = store;
	const {setName, login: userStoreLogin, logout: userStoreLogout} = userStore;

	const requests = useAxios();

	const login = async (email: string, password: string, token: string) => {
		const result: any = await requests.postWithCredentials('user/signin', { email, password, token });
		
		console.log("result", result);

		if(result.message === "Success")
		{
			setName(result.data.userName);
			userStoreLogin();
		}
	}

	const logout = async () => {
		const result: any = await requests.postWithCredentials('user/signout', { });
		
		console.log("result", result);

		if(result.message === "Success")
		{
			setName(result.data.userName);
			userStoreLogout();
		}
	}
	
	return {login, logout};
}