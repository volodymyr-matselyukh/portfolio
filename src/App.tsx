import { useRef } from "react";
import AboutMeSection from "./components/AboutMeSection";
import ExperienceSection from "./components/ExperienceSection";
import TopSection from "./components/TopSection";

function App() {
	
	const aboutMeSectionRef = useRef<null | HTMLDivElement>(null);

	const clickOnScrollingButton = () => {
		if(aboutMeSectionRef.current)
		{
			aboutMeSectionRef.current.scrollIntoView();
		}
	}
	
	return (
		<>
			<TopSection scrollToAboutMeSection={clickOnScrollingButton} />
			<AboutMeSection aboutMeSectionRef={aboutMeSectionRef}/>
			<ExperienceSection />
		</>
	);
}

export default App;
