import { useRef } from "react";
import AboutMeSection from "./components/home/AboutMeSection";
import ExperienceSection from "./components/home/ExperienceSection";
import TopSection from "./components/home/TopSection";
import MainMenu from "./components/home/MainMenu";
import ProjectsSection from "./components/home/ProjectsSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/home/ErrorPage";
import ProjectItem from "./components/home/ProjectItem";
import ContactsSection from "./components/home/ContactsSection";
import FooterSection from "./components/home/FooterSection";
import Article from "./components/blog/Article";
import Menu from "./components/blog/Menu";
import Dashboard from "./components/blog/Dashboard";

function App() {
	const aboutMeSectionRef = useRef<null | HTMLDivElement>(null);

	const clickOnScrollingButton = () => {
		if (aboutMeSectionRef.current) {
			aboutMeSectionRef.current.scrollIntoView();
		}
	};

	const router = createBrowserRouter([
		{
			path: "/blog/:articleName",
			element: (
				<>
					<Menu />
					<Article />
				</>
			),
		},
		{
			path: "/blog",
			element: <Dashboard />
		},
		{
			path: "/",
			element: (
				<>
					<ProjectItem />
					<TopSection
						scrollToAboutMeSection={clickOnScrollingButton}
					/>
					<div className="page-container">
						<MainMenu />
						<AboutMeSection aboutMeSectionRef={aboutMeSectionRef} />
						<ExperienceSection />
						<ProjectsSection />
						<ContactsSection />
						<FooterSection />
					</div>
				</>
			),
			errorElement: <ErrorPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
