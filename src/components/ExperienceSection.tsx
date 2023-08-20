import { experience } from "../resources/experience";

export default function ExperienceSection() {
	return (
		<div 
			id="Experience"
		className="experience experience-section">
			<div className="pf-block">
				<h2 className="pf-block-title">Experience</h2>
				<div className="pf-block-line"></div>

				<div className="row justify-content-center">
					<div className="timeline">
						{experience.map((experienceItem, index) => (
							<div
								key={"experienceItem" + index}
								className={
									index % 2 == 1
										? "timeline-item timeline-item-right"
										: "timeline-item"
								}
							>
								<div className="dates-image">
									<p className="date-to">
										{experienceItem.EndDate}
									</p>
									<span>&ndash;</span>
									<p className="date-from">
										{experienceItem.StartDate}
									</p>
								</div>
								<div className="text">
									<p className="company-title">
										<a
											href={experienceItem.CompanyLink}
											target="blank"
											title={experienceItem.CompanyName}
										>
											<img
												className="lazy-image"
												src={experienceItem.CompanyLogo}
												alt={experienceItem.CompanyName}
												title={
													experienceItem.CompanyName
												}
											/>
										</a>
									</p>
									<p className="company-position">
										{experienceItem.Position}
									</p>
									<p
										className="position-description"
										dangerouslySetInnerHTML={{
											__html: experienceItem.PositionDescription,
										}}
									></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
