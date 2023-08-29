import { useParams } from "react-router-dom";

export default function AddEditArticle(){

	const {articleId} = useParams();

	return (
		<div>Modify article with id: {articleId}</div>
	);
}