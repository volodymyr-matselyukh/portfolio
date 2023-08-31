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
import AddEditArticle from "./components/blog/AddEditArticle";

function App() {
	const aboutMeSectionRef = useRef<null | HTMLDivElement>(null);

	const clickOnScrollingButton = () => {
		if (aboutMeSectionRef.current) {
			aboutMeSectionRef.current.scrollIntoView();
		}
	};

	const router = createBrowserRouter([
		{
			path: "/article/edit/:articleId",
			element: (
				<>
					<Menu />
					<AddEditArticle />
				</>
			),
		},
		{
			path: "/article/:articleName",
			element: (
				<>
					<Menu />
					<Article />
				</>
			),
		},
		{
			path: "/blog",
			element: (
				<>
					<Menu />
					<Dashboard />
				</>
			),
		},
		{
			path: "/unauthorized",
			element: <ErrorPage statusCode={403} />,
		},
		{
			path: "/uknown",
			element: <ErrorPage statusCode={401} />,
		},
		{
			path: "/internal-error",
			element: <ErrorPage statusCode={500} />,
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
			errorElement: <ErrorPage statusCode={404} />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
