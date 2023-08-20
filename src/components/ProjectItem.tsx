import { observer } from "mobx-react-lite";
import { store } from "../stores/store";
import { projects } from "../resources/projects";

export default observer(function ProjectItem() {
	const { projectItemStore } = store;

	const project = projects.find(
		(project) => project.Id == projectItemStore.activeProjectId
	);

	if (!projectItemStore.activeProjectId) {
		document.body.style.overflow = "auto";

		return <></>;
	}

	document.body.style.overflow = "hidden";

	const projectDescription = project!.Description;

	return (
		<div
			className="modal"
			onClick={() => {
				projectItemStore.setActiveProject(null);
			}}
		>
			<div
				className="project-item"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="header">
					<span className="header__project-name">
						{project?.Name}
					</span>
					<a
						title="close"
						className="header__close-button"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							projectItemStore.setActiveProject(null);
						}}
					></a>
				</div>
				<div className="content">
					<img
						className="content__image"
						src={project?.Images[0].Url}
						alt={project?.Images[0].Text}
					/>

					<div className="content__description description">
						<div className="description__tags tags">
							<div className="tags__title">Tech stack:</div>
							{project?.Technologies.map((technology, index) => (
								<span key={"tech"+ index} className="technology-tag">
									{technology}
								</span>
							))}
						</div>

						<div className="description__text">
							<p
								dangerouslySetInnerHTML={{
									__html: projectDescription,
								}}
							></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
