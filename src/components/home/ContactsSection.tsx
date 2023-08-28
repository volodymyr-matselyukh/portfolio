import SendMeAMessageForm from "./SendMeAMessageForm";

export default function ContactsSection() {
	return (
		<div id="Contacts" className="contact-me ">
			<div className="background-mask">
				<div className="pf-block">
					<div>
						<h2 className="pf-block-title">Contact me</h2>
						<div className="pf-block-line"></div>
						<div className="pfblock-subtitle">
							<p>
								If you have any questions do not hesitate to
								contact me.
							</p>
						</div>
						<div className="three-items-block">
							<div className="contact-item">
								<a
									href="https://www.google.com.ua/maps/place/%D0%9B%D1%8C%D0%B2%D1%96%D0%B2,+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+79000/@@49.8296498,23.9805782,12.58z/data=!4m5!3m4!1s0x473add7c09109a57:0x4223c517012378e2!8m2!3d49.839683!4d24.029717"
									target="_blank"
									title="Google map location"
									rel="noopener noreferrer"
								>
									<span>
										<i className="fa fa-map-marker fa-2x"></i>
									</span>
									<p>Ukraine, Lviv</p>
								</a>
							</div>

							<div className="contact-item">
								<span>
									<i className="fa fa-envelope-o fa-2x"></i>
								</span>
								<p>
									<a
										href="mailto:volodymyr.matselyukh@gmail.com"
										title="Email Address"
									>
										volodymyr.matselyukh@gmail.com
									</a>
								</p>
							</div>

							<div className="contact-item">
								<span>
									<i className="fa fa-phone fa-2x"></i>
								</span>
								<p>+380982389137</p>
							</div>
						</div>
						<div className="">
							<p className="leave-me-a-message">
								Leave me a message
							</p>
						</div>

						<SendMeAMessageForm />

						<div className="social-icons">
							<a
								className="social-icon"
								href="https://www.facebook.com/volodymyr.matselyukh"
								target="_blank"
								title="Link to my Facebook"
								rel="noopener noreferrer"
							>
								<span className="hidden">Facebook</span>
								<span className="contact-icon facebook"></span>
							</a>

							<a
								className="social-icon"
								href="https://www.linkedin.com/in/volodymyr-matseliukh"
								target="_blank"
								title="Link to my LinkedIn"
								rel="noopener noreferrer"
							>
								<span className="hidden">LinkedIn</span>
								<span
									className="contact-icon linkedin"
									lazy-background="url(/images/linkedin-contact-icon.png) no-repeat"
								></span>
							</a>

							<a
								className="social-icon"
								href="https://www.upwork.com/o/profiles/users/_~0144cbf4e1bf9885d3/"
								target="_blank"
								title="Link to my Upwork"
								rel="noopener noreferrer"
							>
								<span className="hidden">Upwork</span>
								<span
									className="contact-icon upwork"
									lazy-background="url(/images/upwork-contact-icon.png) no-repeat"
								></span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
