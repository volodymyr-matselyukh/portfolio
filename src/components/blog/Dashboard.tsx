import { Link } from "react-router-dom";
import useArticle from "../../api/articlesService";
import { useEffect, useState } from "react";
import { ArticleInList, ArticleList } from "../../api/models/ArticleInList";

export default function Dashboard() {
	const { listArticles } = useArticle();
	const [articles, setArticles] = useState<ArticleInList[]>([]);

	useEffect(() => {
		listArticles().then((articleList: ArticleList) =>
			setArticles(articleList.articles)
		);
	}, []);

	return (
		<div className="blog">
			<div className="pf-block">
				<div className="add-article">
					<Link
						className="add-article__button"
						to={"/article/edit/0"}
						title="Add new article"
					></Link>
				</div>
				<div className="articles-list">
					{articles.map((article) => (
						<div className="article" key={article.id}>
							{article.name}

							<span className="date">{new Date(article.date).toLocaleString()}</span>
							<span className="modify">{article.isModifyable}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
