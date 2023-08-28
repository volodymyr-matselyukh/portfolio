import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
	const [isBurgerMenuVisible, setIsBurgerMenuVisible] =
		useState<boolean>(false);

	const burgerIconClickHandler = () => {
		setIsBurgerMenuVisible(!isBurgerMenuVisible);
	};

	return (
		<div className="menu">
			<div className="pf-block">
				<div className="content">
					<Link to={"/"} className="content__home-link" title="Portfolio">
						Volodymyr Matseliukh
					</Link>

					<button
						title="Tollge button"
						type="button"
						className="navbar-toggler"
						onClick={burgerIconClickHandler}
					>
						<i className="fa fa-bars"></i>
					</button>

					<div className="content__list">
						<Link to={"/blog"} title="Blog" className="nav-item" onClick={burgerIconClickHandler}>
							Blog
						</Link>
					</div>
				</div>

				{isBurgerMenuVisible && (
					<div className="burger-content">
						<Link to={"/blog"} title="Blog" className="nav-item" onClick={burgerIconClickHandler}>
							Blog
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
