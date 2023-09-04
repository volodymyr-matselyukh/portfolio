import { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useParams } from "react-router-dom";
import { ArticleInList } from "../../api/models/ArticleInList";
import useArticle from "../../api/articlesService";

export default function Article() {
	let { articleName } = useParams();

	const [article, setArticle] = useState<ArticleInList>();
	const { addArticle, getArticleByName } = useArticle();

	useEffect(() => {
		if (articleName) {
			getArticleByName(articleName).then((article: any) => {
				article.keywords = article?.keywords?.join(",");

				setArticle(article);
			});
		}
	}, []);

	const articleDescription = article?.description || "";
	const articleMetaTitle: string = articleName || "";

	const meta = {
		title: `${articleMetaTitle}`,
		description: `${articleDescription}`,
		canonical: `https://matseliukh.com/article/${article?.name}`,
		meta: {
			charset: "utf-8",
			name: {
				keywords: "react,meta,document,html,tags",
			},
		},
	};

	return (
		<DocumentMeta {...meta}>
			<div className="blog">
				<div className="pf-block">
					<h1>{article?.name}</h1>

					<div className="article-date">
						{article?.date && new Date(article?.date).toLocaleDateString()}
					</div>
					<div
						className="content"
						dangerouslySetInnerHTML={{
							__html: article?.content || "",
						}}
					></div>
				</div>
			</div>
		</DocumentMeta>
	);
}
