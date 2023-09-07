import { observer } from "mobx-react-lite";
import { store } from "../../stores/store";
import { projects } from "../../resources/projects";
import { useEffect, useState } from "react";

export default observer(function ProjectItem() {
	const { projectItemStore } = store;

	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		let timeoutId: any = null;

		if (isCopied) {
			timeoutId = setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [isCopied]);

	const project = projects.find(
		(project) => project.Id == projectItemStore.activeProjectId
	);

	if (!projectItemStore.activeProjectId) {
		document.body.style.overflow = "auto";

		return <></>;
	}

	document.body.style.overflow = "hidden";

	const projectDescription = project!.Description;

	const closeModal = () => {
		projectItemStore.setActiveProject(null);
		window.history.pushState("", "", "/");
	};

	return (
		<div
			className="modal"
			onClick={() => {
				closeModal();
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
						<i
							className={
								isCopied
									? "fa-solid fa-link active"
									: "fa-solid fa-link"
							}
							title="Copy link"
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(
									`https://matseliukh.com/?project=${project?.Name.toLowerCase()}`
								);
								setIsCopied(true);
							}}
						></i>
					</span>
					<a
						title="close"
						className="header__close-button"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							closeModal();
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
								<span
									key={"tech" + index}
									className="technology-tag"
								>
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
