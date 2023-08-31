import { ProjectItemStore } from "./project-item-store";
import { UserStore } from "./user-store";

export const store = {
	projectItemStore: new ProjectItemStore(),
	userStore: new UserStore()
}