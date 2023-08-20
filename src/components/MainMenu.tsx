import { useState } from "react";

export default function MainMenu() {
	const [isBurgerMenuVisible, setIsBurgerMenuVisible] =
		useState<boolean>(false);

	const burgerIconClickHandler = () => {
		setIsBurgerMenuVisible(!isBurgerMenuVisible);
	};

	return (
		<div className="main-menu">
			<div className="pf-block">
				<div className="content">
					<a className="content__home-link" title="Top Section" href="#TopSection">
						Volodymyr Matseliukh
					</a>

					<button
						title="Tollge button"
						type="button"
						className="navbar-toggler"
						onClick={burgerIconClickHandler}
					>
						<i className="fa fa-bars"></i>
					</button>

					<div className="content__list">
						<a href="#About" title="About" className="nav-item">
							About
						</a>

						<a href="#Experience" title="Experience" className="nav-item">
							Experience
						</a>

						<a href="#Portfolio" title="Portfolio" className="nav-item">
							Portfolio
						</a>

						<a href="#Contact" title="Contact" className="nav-item">
							Contact
						</a>
					</div>
				</div>

				{isBurgerMenuVisible && (
					<div className="burger-content">
						<a href="#About" title="About" className="nav-item">
							About
						</a>

						<a href="#Experience" title="Experience" className="nav-item">
							Experience
						</a>

						<a href="#Portfolio" title="Portfolio" className="nav-item">
							Portfolio
						</a>

						<a href="#Contact" title="Contact" className="nav-item">
							Contact
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
