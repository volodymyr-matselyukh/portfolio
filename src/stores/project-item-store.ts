import { makeAutoObservable } from "mobx";

export class ProjectItemStore{
	activeProjectId: number | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setActiveProject(id: number | null)
	{
		this.activeProjectId = id;
	}
}