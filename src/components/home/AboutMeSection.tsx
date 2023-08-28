import { useState } from "react";

interface IProps {
	aboutMeSectionRef: any;
}

export default function AboutMeSection({ aboutMeSectionRef }: IProps) {
	let [yearsOfExperience, setYearsOfExperience] = useState(10);

	return (
		<div
			id="About"
			className="about-me about-me-section"
			ref={aboutMeSectionRef}
		>
			<div className="pf-block">
				<h2 className="pf-block-title">About me</h2>
				<div className="pf-block-line"></div>
				<div className="pf-block-text">
					<p>
						Hello! You've just landed on my portfolio web page. Here
						you can find the introduction of myself as well as the
						information about my work experience. Let's met each
						other.
					</p>
					<p>
						My name is Volodymyr and I am software engineer. I have
						around {yearsOfExperience} years of experience in IT. I
						like challenging tasks and big projects. By "challenging
						tasks" I mean performance optimization, productizing
						features that have been built using lean approach or
						creating a new service and plugging it in existing
						domain.{" "}
					</p>
					<h4>I am Microsoft certified developer. Passed exams:</h4>
					<ul>
						<li>
							70-480: Programming in HTML5 with JavaScript and
							CSS3
						</li>
						<li>70-486: Developing ASP.NET MVC Web Applications</li>
						<li>
							70-487: Developing Microsoft Azure and Web Services
						</li>
						<li>
							AZ-204: Developing Solutions for Microsoft Azure
						</li>
					</ul>

					<p>
						Despite the fact I spent all my carrier mostly
						developing websites using .Net and JS, the programming
						language does not matter. I am ready to start learning
						new programming language if needed. Node.JS
						<i className="technology-icon node-js"></i>, Python
						<i className="technology-icon python"></i>, Solidity
						<i className="technology-icon solidity"></i>...
					</p>
				</div>

				<p className="download-resume text-center">
					<a
						className="btn btn-primary"
						href="https://drive.google.com/file/d/1DwOfXRLCLmXbd_tEqASSyzV3ztQaPrwo/view?usp=sharing"
						target="_blank"
						title="View/Download Resume"
					>
						<i className="fa fa-download"></i>
						View/Download Resume
					</a>
				</p>
			</div>
		</div>
	);
}
