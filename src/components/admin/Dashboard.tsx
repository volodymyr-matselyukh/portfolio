import { Link, useNavigate } from "react-router-dom";
import useArticle from "../../api/articlesService";
import { useEffect, useState } from "react";
import { ArticleInList, ArticleList } from "../../api/models/ArticleInList";
import { Card, Icon } from "semantic-ui-react";
import { store } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Dashboard() {
	const navigate = useNavigate();
	const { listMyArticles } = useArticle();
	const { userStore } = store;

	const { isLoggedIn } = userStore;

	const [articles, setArticles] = useState<ArticleInList[]>([]);

	useEffect(() => {
		listMyArticles().then((articleList: ArticleList) =>
			setArticles(articleList.articles)
		);
	}, []);

	return (
		<div className="blog">
			<div className="pf-block">
				{isLoggedIn && (
					<div className="add-article">
						<Link
							className="add-article__button"
							to={"/article/edit/0"}
							title="Add new article"
						></Link>
					</div>
				)}

				<div className="articles-list">
					<Card.Group>
						{articles.map((article) => (
							<Card
								link
								href={`/article/edit/${article.id}`}
								key={article.id}
								className={article.isPublished ? "article article--published" : "article" } 
							>
								<Card.Content header={article.name} />
								<Card.Content
									description={article.description}
								/>
								<Card.Content extra className="article-footer">
									<div className="article-date">
										<Icon name="calendar alternate outline"></Icon>
										{new Date(
											article.date
										).toLocaleDateString()}
									</div>
								</Card.Content>
							</Card>
						))}
					</Card.Group>
				</div>
			</div>
		</div>
	);
});
