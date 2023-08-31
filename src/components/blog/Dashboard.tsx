import { Link } from "react-router-dom";
import useArticle from "../../api/articlesService";
import { useEffect, useState } from "react";
import { ArticleInList, ArticleList } from "../../api/models/ArticleInList";
import { Card, Icon } from "semantic-ui-react";
import { store } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Dashboard() {
	const { listArticles } = useArticle();
	const { userStore } = store;

	const { isLoggedIn } = userStore;

	const [articles, setArticles] = useState<ArticleInList[]>([]);

	useEffect(() => {
		listArticles().then((articleList: ArticleList) =>
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
							// <div className="article" >
							// 	{article.name}

							// 	<span className="date">{new Date(article.date).toLocaleString()}</span>
							// 	<span className="modify">{article.isModifyable}</span>
							// </div>

							<Card
								link
								href={`/article/${article.name}`}
								key={article.id}
								className="article"
							>
								<Card.Content header={article.name} />
								<Card.Content
									description={article.description}
								/>
								<Card.Content extra className="article-footer">
									{article.isModifyable && (
										<Link
											to={`/article/edit/${article.id}`}
										>
											<Icon
												className="article-modify"
												name="edit outline"
											/>
										</Link>
									)}

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
