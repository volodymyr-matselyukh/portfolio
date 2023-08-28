import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';
import LoginForm from './LoginForm';

interface IProps{
	scrollToAboutMeSection: () => void;
}

export default function TopSection({scrollToAboutMeSection}: IProps) {

	const [isAnimated, setIsAnimated] = useState<boolean>(false);

	return (
		<div id="TopSection" className="top-section">
			<div className="top-section__overlay overlay">
				<div className="overlay__intro intro" user-itemscope="true" user-itemtype="http://schema.org/Person">
					<div className="intro__intro-image-block intro-image-block">
						<img className={isAnimated ? "intro-image-block__image intro-image-block__image--animated" : "intro-image-block__image" } 
							src="./images/volodymyr_matseliukh_photo.png" 
							alt="Volodymyr Matseliukh" 
							height="439" 
							width="400"
							onClick={ (e) => {
								if(e.detail === 5)
								{
									setIsAnimated(true);
								}
							}} />

						<div className={isAnimated ? "login login--animated" : "login"}>
							<LoginForm />
						</div>
					</div>
					<div className="intro__intro-text-block intro-text-block">
						<h1 className="intro-text-block__text" >
							Hi, my name is <span user-itemprop="name">Volodymyr Matseliukh</span> and I am
							<span className="intro-text-block__middle-text" user-itemprop="jobTitle">Software Engineer</span>
							creating modern and responsive web applications
						</h1>
					</div>
				</div>

				<div className="overlay__scroll-down scroll-down" onClick={scrollToAboutMeSection}>
					<a className="scroll-anchor" href="#AboutMe" title="AboutMe">
						<span className="hidden">Scroll down</span>
						<span>
							<FontAwesomeIcon icon={solid('angle-down')} size="2x" />
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}