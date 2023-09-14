import { useEffect, useRef } from "react";
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
import AdminDashboard from "./components/admin/Dashboard";
import AddEditArticle from "./components/admin/AddEditArticle";
import getProjectNameFromUrl from "./utils/urlHelper";



function App() {
	const aboutMeSectionRef = useRef<null | HTMLDivElement>(null);
	const portfolioSectionRef = useRef<null | HTMLDivElement>(null);

	const clickOnScrollingButton = () => {
		if (aboutMeSectionRef.current) {
			aboutMeSectionRef.current.scrollIntoView();
		}
	};

	useEffect(() => {
		const projectName = getProjectNameFromUrl();

		if (projectName) {
			portfolioSectionRef.current?.scrollIntoView();
		}
	}, []);

	const getHomePage = (isLoginPage: boolean = false) => {
		return (
			<>
				<ProjectItem />
				<TopSection
					scrollToAboutMeSection={clickOnScrollingButton}
					isLoginPage={isLoginPage}
				/>
				<div className="page-container">
					<MainMenu />
					<AboutMeSection aboutMeSectionRef={aboutMeSectionRef} />
					<ExperienceSection />
					<ProjectsSection
						portfolioSectionRef={portfolioSectionRef}
					/>
					<ContactsSection />
					<FooterSection />
				</div>
			</>
		);
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
					<FooterSection />
				</>
			),
		},
		{
			path: "admin/blog",
			element: (
				<>
					<Menu activePage="AdminDashboard" />
					<AdminDashboard />
					<FooterSection />
				</>
			),
		},
		{
			path: "/blog",
			element: (
				<>
					<Menu activePage="Dashboard" />
					<Dashboard />
					<FooterSection />
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
			path: "/login",
			element: getHomePage(true),
		},
		{
			path: "/",
			element: getHomePage(),
			errorElement: <ErrorPage statusCode={404} />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
