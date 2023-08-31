import { Field, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import useArticle from "../../api/articlesService";
import { useState } from "react";
import MyTextArea from "../controls/MyTextArea";

const MessageSendSchema = Yup.object().shape({
	name: Yup.string().required("Required"),
	content: Yup.string().required("Required"),
	keywords: Yup.string().required("Required"),
	description: Yup.string().required("Required"),
});

export default function AddEditArticle() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("");
	const { articleId } = useParams();
	const { addArticle } = useArticle();

	return (
		<div className="blog">
			<div className="pf-block">
				<Formik
					initialValues={{
						name: "",
						content: "",
						keywords: "",
						description: "",
					}}
					validationSchema={MessageSendSchema}
					onSubmit={async (values, { resetForm }) => {
						setIsLoading(true);

						try {
							await addArticle(
								values.name,
								values.content,
								values.keywords,
								values.description
							);
							setStatus("Success");
							resetForm();
						} catch (err: any) {
							console.error("error happened", err);
							const errorMessage = err.response?.data?.message || "Internal error happened. Try later."
							setStatus(errorMessage);
						} finally {
							setIsLoading(false);
						}
					}}
				>
					{({ errors, touched }) => (
						<Form className="message-form">
							<div className="article-fields-block">
								<div className="input-block">
									<label className="label" htmlFor="name">
										Name
									</label>
									<Field
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										className="form-control-input"
										placeholder="john.doe@gmail.com"
										max={50}
									/>
									{errors.name && touched.name ? (
										<span className="text-danger">
											{errors.name}
										</span>
									) : null}
								</div>

								<div className="input-block">
									<label className="label" htmlFor="content">
										Content
									</label>
									<MyTextArea
										id="content"
										name="content"
										className="form-control-text-area"
										placeholder="html content here"
										rows={20}
										maxLength={50000}
									></MyTextArea>
									{errors.content && touched.content ? (
										<span className="text-danger">
											{errors.content}
										</span>
									) : null}
								</div>

								<div className="input-block">
									<label className="label" htmlFor="keywords">
										Keywords
									</label>
									<Field
										id="keywords"
										name="keywords"
										type="text"
										autoComplete="keywords"
										className="form-control-input"
										placeholder="keywords for meta tags"
										max={50}
									/>
									{errors.keywords && touched.keywords ? (
										<span className="text-danger">
											{errors.keywords}
										</span>
									) : null}
								</div>

								<div className="input-block">
									<label className="label" htmlFor="description">
										Description
									</label>
									<Field
										id="description"
										name="description"
										type="text"
										autoComplete="description"
										className="form-control-input"
										placeholder="description for meta tags"
										max={50}
									/>
									{errors.description && touched.description ? (
										<span className="text-danger">
											{errors.description}
										</span>
									) : null}
								</div>
							</div>

							<div className="create-button-row">
								<button
									type="submit"
									className="btn btn-outline-light"
									id="SendMessageBtn"
								>
									<div className="button-content">
										<span className="text">
											{isLoading
												? "Creating..."
												: "Create"}
										</span>

										{isLoading && (
											<img
												src="./images/loading-icon.gif"
												alt="loading"
												className="loading-icon"
											></img>
										)}
									</div>
								</button>
								{status && (
									<span className="text-danger">
										{status}
									</span>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
