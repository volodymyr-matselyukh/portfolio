import useAxios from "./agent";
import { ArticleInList, ArticleList } from "./models/ArticleInList";


export default function useArticle(){
	const requests = useAxios();

	const addArticle = async (id: string, name: string, content:string, keywords:string, description: string) => {
		const result = await requests.post('article', { id, name, content, keywords, description });		
	
		return result;
	}

	const listArticles = async (): Promise<ArticleList> => {
		const result = await requests.get('article');

		return result as ArticleList;
	}

	const listMyArticles = async (): Promise<ArticleList> => {
		const result = await requests.get('article/my');

		return result as ArticleList;
	}

	const getArticle = async (id: string) => {
		const result = await requests.get(`article/${id}`);
	
		return result as ArticleInList;
	}

	const getArticleByName = async (name: string) => {
		const result = await requests.get(`article/getbyname/${name}`);
	
		return result as ArticleInList;
	}

	return { addArticle, listArticles, getArticle, getArticleByName, listMyArticles };
}