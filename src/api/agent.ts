import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";
import { useNavigate } from "react-router-dom";

//"https://matseliukh-portfolio-back-end.fly.dev";

export default function useAxios() {
	const navigate = useNavigate();
	const {userStore} = store;
	const {logout} = userStore;

	axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
	
	axios.interceptors.response.use(null, (error: AxiosError) => {
		let status, config;
	
		if (error.response) {
			status = error.response.status;
			config = error.response.config;
		}
	
		switch (status) {
			case 401:
				if (config && config.url !== "/") {
					navigate("/uknown");
					logout();
				}
	
				break;
			case 403:
				if (config && config.url !== "/account") {
					navigate("/unauthorized");
				}
	
				break;
			case 404:
				navigate("/not-found");
				break;
			case 500:
				navigate("/internal-error");
				break;
		}
	
		return Promise.reject(error);
	});
	
	const responseBody = <T>(response: AxiosResponse<T>) => response.data;
	
	const requests = {
		get: <T>(url: string) => axios.get<T>(url, { withCredentials: true }).then(responseBody),
		post: <T>(url: string, body: {}) => axios.post<T>(url, body, { withCredentials: true }).then(responseBody),
		post_original: <T>(url: string, body: {}, options: {}) => axios.post<T>(url, body, options),
		put: <T>(url: string, body: {}) => axios.put<T>(url, body, { withCredentials: true }).then(responseBody),
		del: <T>(url: string) => axios.delete<T>(url, { withCredentials: true }).then(responseBody),
	}
	
	return requests;
}

