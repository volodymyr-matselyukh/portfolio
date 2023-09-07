const getProjectNameFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const projectName = urlParams.get('project');

	return projectName;
}

export default getProjectNameFromUrl; 	