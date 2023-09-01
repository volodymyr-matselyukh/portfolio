import { makeAutoObservable, reaction } from "mobx";

const jwtTokenCookieName = "jwt";

export class UserStore {
	token: string | null = window.localStorage.getItem(jwtTokenCookieName);
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

		reaction(
            () => this.token,
            token => {
				console.log("token set");
                if(token){
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
	}

	setName = (name: string | null) => {
		this.name = name;
	}

	setToken = (token: string | null) => {
        this.token = token;
    }

	logout = () => {
		this.deleteCookie(jwtTokenCookieName);
		this.name = null;
		this.setToken(null);
	}

	login = () => {
		const jwtFromCookie = this.getCookie(jwtTokenCookieName);
		
		if (!!jwtFromCookie) {
			this.token = jwtFromCookie;
		}
	}

	get userName() {
		return this.name;
	}

	get isLoggedIn() {

		const isLogged = !!this.token;

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