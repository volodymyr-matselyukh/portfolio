import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import LoginForm from "./LoginForm";

interface IProps {
	scrollToAboutMeSection: () => void;
	isLoginPage?: boolean;
}

export default function TopSection({
	scrollToAboutMeSection,
	isLoginPage = false,
}: IProps) {
	const [isLoginFormShown, setIsLoginFormShown] = useState<boolean>(isLoginPage ? true : false);

	const getLoginForm = () => {
		return (
			<div className={isLoginFormShown ? "login login--animated" : "login"}>
				<LoginForm />
			</div>
		);
	};

	return (
		<div id="TopSection" className="top-section">
			<div className="top-section__overlay overlay">
				<div
					className="overlay__intro intro"
					user-itemscope="true"
					user-itemtype="http://schema.org/Person"
				>
					<div className="intro__intro-image-block intro-image-block">
						{isLoginPage ? (
							getLoginForm()
						) : (
							<>
								<img
									className={
										isLoginFormShown
											? "intro-image-block__image intro-image-block__image--animated"
											: "intro-image-block__image"
									}
									src="./images/volodymyr_matseliukh_photo.png"
									alt="Volodymyr Matseliukh"
									height="439"
									width="400"
									onClick={(e) => {
										if (e.detail === 5) {
											setIsLoginFormShown(true);
										}
									}}
								/>

								{getLoginForm()}
							</>
						)}
					</div>
					<div className="intro__intro-text-block intro-text-block">
						<h1 className="intro-text-block__text">
							Hi, my name is{" "}
							<span user-itemprop="name">
								Volodymyr Matseliukh
							</span>{" "}
							and I am
							<span
								className="intro-text-block__middle-text"
								user-itemprop="jobTitle"
							>
								Software Engineer
							</span>
							creating modern and responsive web applications
						</h1>
					</div>
				</div>

				<div
					className="overlay__scroll-down scroll-down"
					onClick={scrollToAboutMeSection}
				>
					<a
						className="scroll-anchor"
						href="#AboutMe"
						title="AboutMe"
					>
						<span className="hidden">Scroll down</span>
						<span>
							<FontAwesomeIcon
								icon={solid("angle-down")}
								size="2x"
							/>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
