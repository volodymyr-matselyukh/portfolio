import { useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface IProps{
	activePage?: string
}

export default observer(function Menu({activePage}: IProps) {
	const [isBurgerMenuVisible, setIsBurgerMenuVisible] =
		useState<boolean>(false);

	const burgerIconClickHandler = () => {
		setIsBurgerMenuVisible(!isBurgerMenuVisible);
	};

	const { userStore } = store;
	const { isLoggedIn } = userStore;

	return (
		<div className="menu">
			<div className="pf-block">
				<div className="content">
					<Link
						to={"/"}
						className="content__home-link"
						title="Portfolio"
					>
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
						{isLoggedIn && (
							<Link
								to={"/admin/blog"}
								title="Dashboard"
								className={activePage == "AdminDashboard" ? "nav-item nav-item--active" : "nav-item"} 
								onClick={burgerIconClickHandler}
							>
								Dashboard
							</Link>
						)}

						<Link
							to={"/blog"}
							title="Blog"
							className={activePage == "Dashboard" ? "nav-item nav-item--active" : "nav-item"} 
							onClick={burgerIconClickHandler}
						>
							Blog
						</Link>
					</div>
				</div>

				{isBurgerMenuVisible && (
					<div className="burger-content">
						<Link
							to={"/blog"}
							title="Blog"
							className="nav-item"
							onClick={burgerIconClickHandler}
						>
							Blog
						</Link>
					</div>
				)}
			</div>
		</div>
	);
})
