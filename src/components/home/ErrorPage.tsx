import { Link } from "react-router-dom";

interface IProps{
	statusCode: number;
}

export default function ErrorPage({statusCode}: IProps) {

	let message = "";

	switch(statusCode){
		case 404:
			message = "Ooops... This page is not found";
			break;
		case 401:
			message = "Unknown user";
			break;
		default:
			message = "Internal server error";
	}

	return (
		<div className="container">
			<h3>{message}</h3>

			<Link to={"/"}>Take me home</Link>
			<Link to={"/blog"}>Visit blog</Link>
		</div>
	);
}
