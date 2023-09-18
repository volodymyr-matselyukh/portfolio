import { Link, useNavigate } from "react-router-dom";
import useArticle from "../../api/articlesService";
import { useEffect, useState } from "react";
import { ArticleInList, ArticleList } from "../../api/models/ArticleInList";
import { Icon } from "semantic-ui-react";
import { store } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function Dashboard() {
	const { listArticles } = useArticle();
	const { userStore } = store;

	const { isLoggedIn } = userStore;

	const [articles, setArticles] = useState<ArticleInList[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		listArticles().then((articleList: ArticleList) =>
			setArticles(articleList.articles)
		);
	}, []);

	return (
		<div className="blog">
			<div className="pf-block">
				<div className="w-full p-2.5 flex gap-2 items-baseline">
						{articles.map((article) => (
							<div
								onClick={() => navigate(`/article/${article.name}`)}
								key={article.id}
								className="outline text-xl border-solid border-2 outline-2 outline-white border-gray-200 rounded-lg
								p-3 hover:cursor-pointer hover:outline-gray-400 basis-96"
							>
								<div
									className="font-bold"
								>{article.name}</div>
								<hr className="mb-3 mt-3"></hr>
								<div>{article.description}</div>

								<hr className="mb-3 mt-3"></hr>

								<div className="flex justify-between text-gray-400">
									<span className="">{article.author.name}</span>

									<div className="">
										<Icon 
										className="relative top-0.5 right-1 "
										name="calendar alternate outline"></Icon>
										{new Date(
											article.date
										).toLocaleDateString()}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
});
