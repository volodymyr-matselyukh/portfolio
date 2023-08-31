import { makeAutoObservable, reaction } from "mobx";

const jwtTokenCookieName = "jwt";

export class UserStore {
	authCookieSet: boolean = false;
	name: string | null = window.localStorage.getItem("username");

	constructor() {
		makeAutoObservable(this);

		reaction(
			() => this.name,
			name => {
				if (name) {
					window.localStorage.setItem('username', name);
				} else {
					window.localStorage.removeItem('username');
				}
			}
		)
	}

	setName = (name: string | null) => {
		this.name = name;
	}

	logout = () => {
		this.deleteCookie(jwtTokenCookieName);
		this.name = null;
		this.authCookieSet = false;
	}

	login = () => {
		const isCookieSet = !!this.getCookie(jwtTokenCookieName);
		if (isCookieSet) {
			this.authCookieSet = true;
		}
	}

	get userName() {
		return this.name;
	}

	get isLoggedIn() {

		const isLogged = this.authCookieSet && !!this.getCookie(jwtTokenCookieName);

		console.log("is logged in", isLogged);

		return isLogged;
	}

	getCookie(key: string) {
		const matchedList = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
		const cookieValue = matchedList ? matchedList.pop() : "";

		return cookieValue || "";
	}

	deleteCookie(name: string) {
		if (this.getCookie(name)) {
			document.cookie = `${name}=deleted;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
		}
	}
}