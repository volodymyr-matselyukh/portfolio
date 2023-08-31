import useAxios from "./agent";
import { ArticleList } from "./models/ArticleInList";


export default function useArticle(){
	const requests = useAxios();

	const addArticle = async (name: string, content:string, keywords:string, description: string) => {
		const result = await requests.post('article', { name, content, keywords, description });		
	
		return result;
	}

	const listArticles = async (): Promise<ArticleList> => {
		const result = await requests.get('article');

		return result as ArticleList;
	}

	return { addArticle, listArticles };
}