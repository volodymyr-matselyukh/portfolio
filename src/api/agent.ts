import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

//"https://matseliukh-portfolio-back-end.fly.dev";

export default function useAxios() {
	const navigate = useNavigate();
	const { userStore } = store;
	const { logout, setName, login } = userStore;
	const instance = useRef(axios.create({
		baseURL: process.env.REACT_APP_BACKEND_URL
	}));

	instance.current.interceptors.request.use(config => {
		const token = userStore.token;
		if (token && config.headers) {
			config.headers.Authorization = token;
		}

		return config;
	})

	instance.current.interceptors.response.use(null, async (error: AxiosError) => {
		let status, config;

		if (error.response) {
			status = error.response.status;
			config = error.response.config;
		}

		switch (status) {
			case 401:
				if (config && config.url !== "/" && config.url !== "/login") {

					const originalRequest: any = error.config;

					if (!originalRequest || originalRequest._retry) {
						navigate("/login");
						logout();
						break;
					}

					originalRequest._retry = true;

					try {

						const result: any = await requests.postWithCredentials("user/refresh", {});

						console.log("refresh result", result);

						if (result.message === "Success") {
							setName(result.data.userName);
							login();
						}

						return instance.current.request(originalRequest);

					}
					catch (err) {
						console.error("refresh error", err);

						navigate("/login");
						logout();
					}
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
		get: <T>(url: string) => instance.current.get<T>(url).then(responseBody),
		post: <T>(url: string, body: {}) => instance.current.post<T>(url, body).then(responseBody),
		postWithCredentials: <T>(url: string, body: {}) => instance.current.post<T>(url, body, { withCredentials: true }).then(responseBody),
		put: <T>(url: string, body: {}) => instance.current.put<T>(url, body).then(responseBody),
		del: <T>(url: string) => instance.current.delete<T>(url).then(responseBody),
	}

	return requests;
}

