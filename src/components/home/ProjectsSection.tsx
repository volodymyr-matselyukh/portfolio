import { useEffect, useState } from "react";
import { projects } from "../../resources/projects";
import { store } from "../../stores/store";
import getProjectNameFromUrl from "../../utils/urlHelper";

interface IProps{
	portfolioSectionRef: any;
}

export default function ProjectsSection({ portfolioSectionRef }: IProps) {
	const { projectItemStore } = store;

	const [companiesMap, setCompaniesMap] = useState<Map<string, number>>(
		new Map()
	);

	const [technologiesArray, setTechnologiesArray] = useState<any[]>([]);

	const [activeCompany, setActiveCompany] = useState<string | null>("All");
	const [activeTechnology, setActiveTechnology] = useState<string | null>(
		"All"
	);

	useEffect(() => {
		initializeCompaniesMap();
		initializeTechnologyArray();

		preSelectProject();

	}, [activeCompany, activeTechnology]);

	const preSelectProject = () => {
		const selectedProjectName = getProjectNameFromUrl();
		if(selectedProjectName)
		{
			const project = projects.find(p => p.Name.toLowerCase() === selectedProjectName);

			if(project)
			{
				projectItemStore.setActiveProject(project.Id);
			}
		}
	}

	const initializeCompaniesMap = () => {
		const companiesMap = new Map<string, number>();

		companiesMap.set("All", projects.length);

		for (let i = 0; i < projects.length; i++) {
			if (
				activeCompany &&
				activeCompany !== "All" &&
				projects[i].Company !== activeCompany
			) {
				continue;
			}

			if (
				activeTechnology &&
				activeTechnology !== "All" &&
				projects[i].Technologies.every((t) => t !== activeTechnology)
			) {
				continue;
			}

			if (companiesMap.has(projects[i].Company)) {
				let currentCount = companiesMap.get(projects[i].Company) || 0;
				companiesMap.set(projects[i].Company, currentCount + 1);
			} else {
				companiesMap.set(projects[i].Company, 1);
			}
		}

		setCompaniesMap(companiesMap);
	};

	const initializeTechnologyArray = () => {
		const technologiesMap = new Map<string, number>();
		const technologiesSet = new Set();

		projects.forEach((project) =>
			project.Technologies.forEach((technology) =>
				technologiesSet.add(technology)
			)
		);

		let totalTechnologiesCount = 0;

		for (let i = 0; i < projects.length; i++) {
			if (
				activeCompany &&
				activeCompany != "All" &&
				activeCompany !== projects[i].Company
			) {
				continue;
			}

			for (let j = 0; j < projects[i].Technologies.length; j++) {
				if (technologiesMap.has(projects[i].Technologies[j])) {
					let currentCount =
						technologiesMap.get(projects[i].Technologies[j]) || 0;
					technologiesMap.set(
						projects[i].Technologies[j],
						currentCount + 1
					);
				} else {
					technologiesMap.set(projects[i].Technologies[j], 1);
				}

				totalTechnologiesCount++;
			}
		}

		technologiesMap.set("All", totalTechnologiesCount);

		setTechnologiesArray(getSortedArray(technologiesMap));
	};

	const getSortedArray = (map: Map<string, number>) => {
		const sortedArray: any[] = [];

		let maxNumber = 0;

		map.forEach((value, key) => {
			if (value > maxNumber) {
				maxNumber = value;
			}
		});

		for (let i = maxNumber; i > 0; i--) {
			map.forEach((value, key) => {
				if (value === i) {
					sortedArray.push({ key, value });
				}
			});
		}

		return sortedArray;
	};

	const getCompaniesProjectsRow = () => {
		const rowItems: any[] = [];

		companiesMap.forEach((projectsCount, company) => {
			rowItems.push(
				<span
					onClick={() => {
						setActiveTechnology(null);
						setActiveCompany(company);
					}}
					key={company}
					className={
						activeCompany == company
							? "company-name active"
							: "company-name"
					}
					dangerouslySetInnerHTML={{
						__html: `${company}(${projectsCount})`,
					}}
				></span>
			);
		});

		return rowItems;
	};

	const getTechnologiesRow = () => {
		const rowItems: any[] = [];

		technologiesArray.forEach((technologyObject) => {
			rowItems.push(
				<span
					onClick={() => {
						setActiveCompany(null);
						setActiveTechnology(technologyObject.key);
					}}
					key={technologyObject.key}
					className={
						activeTechnology == technologyObject.key
							? "technology-tag active"
							: "technology-tag"
					}
				>
					{technologyObject.key}
					<span className="counter">{technologyObject.value}</span>
				</span>
			);
		});

		return rowItems;
	};

	return (
		<div id="Portfolio" className="portfolio">
			<div className="pf-block max">
				<h2 className="pf-block-title">Portfolio</h2>

				<div className="pf-block-line"></div>
				<div className="pf-block-text">
					<p>
						Here you can see the projects I was working on. I've
						added some description, so you will be able to
						understand the type of each project and it's complexity.
					</p>
				</div>

				<div className="companies-row">{getCompaniesProjectsRow()}</div>

				<div className="technologies-row">{getTechnologiesRow()}</div>

				<div className="portfolio-container">
					<div className="up-down-buttons">
						<a href="#Portfolio" title="up" className="up"></a>
						<a href="#Contacts" title="down" className="down"></a>
					</div>

					<div className="row"
						ref={portfolioSectionRef}
					>
						{projects
							.sort((a, b) => (a.Order > b.Order ? 1 : -1))
							.map((project) => {
								if (
									activeCompany &&
									activeCompany !== "All" &&
									project.Company !== activeCompany
								) {
									return;
								}

								if (
									activeTechnology &&
									activeTechnology !== "All" &&
									project.Technologies.every(
										(t) => t !== activeTechnology
									)
								) {
									return;
								}

								return (
									<a
										onClick={(e) => {
											e.preventDefault();
											projectItemStore.setActiveProject(
												project.Id
											);
											window.history.pushState("", "", `/?project=${project.Name.toLowerCase()}`);
										}}
										key={"project" + project.Id}
										className="portfolio-item__link"
										data-toggle="modal"
										data-target="#PortfolioItemModal"
										title={project.Company}
									>
										<div
											className={
												project.Company.replace(
													" ",
													"_"
												) + "portfolio-item__container"
											}
										>
											<img
												className="lazy-image portfolio-item__main-image"
												src={project.Images[0].Url}
												title={project.Images[0].Text}
												alt={project.Images[0].Text}
												width="200"
												height="200"
											/>
										</div>
									</a>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
