export interface ArticleList{
	articles: ArticleInList []
}

export interface ArticleInList{
	name: string,
	id: string,
	date: Date,
	isModifyable: boolean,
	description: string,
	content: string,
	keywords: string
}