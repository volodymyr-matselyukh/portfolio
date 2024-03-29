import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import useArticle from "../../api/articlesService";
import { useEffect, useState } from "react";
import MyTextInput from "../controls/MyTextInput";
import MyFormikTextArea from "../controls/MyFormikTextArea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArticleInList } from "../../api/models/ArticleInList";
import MyCheckbox from "../controls/MyCheckbox";

const MessageSendSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	content: Yup.string().required("Required"),
	keywords: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
	isPublished: Yup.boolean(),
});

export default function AddEditArticle() {
	const { articleId } = useParams();
	const { addArticle, getArticle } = useArticle();

	const [article, setArticle] = useState<ArticleInList>();

	useEffect(() => {
		if (articleId && articleId != "0") {
			getArticle(articleId).then((article: any) => {
				article.keywords = article?.keywords?.join(",");

				setArticle(article);
			});
		}
	}, []);

	return (
		<div className="blog">
			<div className="pf-block">
				<Formik
					enableReinitialize
					initialValues={{
						id: article?.id || "",
						name: article?.name || "",
						content: article?.content || "",
						keywords: article?.keywords || "",
						description: article?.description || "",
						isPublished: article?.isPublished || false,
					}}
					validationSchema={MessageSendSchema}
					onSubmit={async (values, { resetForm }) => {
						toast.promise(
							addArticle(
								values.id,
								values.name,
								values.content,
								values.keywords,
								values.description,
								values.isPublished
							).then((_) => {
								setArticle({
									id: values.id,
									name: values.name,
									content: values.content,
									keywords: values.keywords,
									description: values.description,
									isPublished: values.isPublished,
								} as ArticleInList);
								resetForm();
							}),
							{
								pending: article
									? "Updating an article"
									: "Adding an article",
								success: article
									? "Article updated"
									: "Article added 👌",
								error: "Error happened 🤯",
							}
						);
					}}
				>
					{(handleChange) => (
						<Form className="message-form ui form">
							<input type="hidden" name="id" />

							<MyTextInput
								name="name"
								placeholder="article name here"
								label="Article name"
							/>

							<MyFormikTextArea
								name="content"
								label="Content"
								placeholder="Html allowed"
								rows={10}
							/>

							<MyTextInput
								name="keywords"
								placeholder="Comma separated string i.e. html, fly.io, continues delivery"
								label="Keywords"
							/>

							<MyFormikTextArea
								name="description"
								label="Description"
								placeholder="Article description"
								rows={3}
							/>

							<MyCheckbox 
								name="isPublished"
								aria-label="Is published"
							/>

							{/* <label>
								<input
									name="healthBackground"
									type="checkbox"
									onChange={handleChange}
									value="test1"
								/>
								test1
							</label> */}

							<div className="create-button-row">
								<button
									type="submit"
									className="btn btn-outline-light"
									id="SendMessageBtn"
								>
									<div className="button-content">
										<span className="text">
											{!!article ? "Update" : "Create"}
										</span>
									</div>
								</button>
								<ToastContainer />
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
