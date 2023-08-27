import { useRef } from "react";
import AboutMeSection from "./components/AboutMeSection";
import ExperienceSection from "./components/ExperienceSection";
import TopSection from "./components/TopSection";
import MainMenu from "./components/MainMenu";
import ProjectsSection from "./components/ProjectsSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import ProjectItem from "./components/ProjectItem";
import ContactsSection from "./components/ContactsSection";
import FooterSection from "./components/FooterSection";

function App() {
	const aboutMeSectionRef = useRef<null | HTMLDivElement>(null);

	const clickOnScrollingButton = () => {
		if (aboutMeSectionRef.current) {
			aboutMeSectionRef.current.scrollIntoView();
		}
	};

	const router = createBrowserRouter([
		{
			path: "/api",
			
		},
		{
			path: "/",
			element: (
				<>
					<ProjectItem />
					<TopSection
						scrollToAboutMeSection={clickOnScrollingButton}
					/>
					<MainMenu />
					<AboutMeSection aboutMeSectionRef={aboutMeSectionRef} />
					<ExperienceSection />
					<ProjectsSection />
					<ContactsSection />
					<FooterSection />
				</>
			),
			errorElement: <ErrorPage />
		}
	]);

	return <RouterProvider router={router} />;
}

export default App;
