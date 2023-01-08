import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function TopSection() {
	return (
		<div id="TopSection" className="container-fluid top-section">
			<div className="top-section__overlay overlay">
				<div className="overlay__intro intro" user-itemscope="true" user-itemtype="http://schema.org/Person">
					<div className="intro__intro-image-block intro-image-block">
						<img className="intro-image-block__image" src="./images/volodymyr_matseliukh_photo.png" alt="Volodymyr Matseliukh" height="439" width="400" />
					</div>
					<div className="intro__intro-text-block intro-text-block">
						<h1 className="intro-text-block__starting-text" >
							Hi, my name is <span user-itemprop="name">Volodymyr Matseliukh</span> and I am
							<span className="intro-text-block__middle-text" user-itemprop="jobTitle">Full stack web developer</span>
						</h1>
						<p className="intro-text-block__ending-text">creating modern and responsive Web Application</p>
					</div>
				</div>

				<div className="overlay__scroll-down scroll-down">
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