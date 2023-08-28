import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div className="container">
			<h3>Ooops... This page is not found</h3>

			<Link to={"/"}>Take me home</Link>
		</div>
	);
}
