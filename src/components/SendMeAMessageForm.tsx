import { Formik, Form, Field, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import sendEmail from "../api/emailService";
import { useState } from "react";

const MessageSendSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string()
		.email("Invalid email")
		.max(50, "Too Long!")
		.required("Required"),
	message: Yup.string()
		.min(2, "Too Short!")
		.max(500, "Too Long!")
		.required("Required"),
});

export default function SendMeAMessageForm() {
	const [successAlertVisible, setSuccessAlertVisible] = useState<boolean>();
	const [errorAlertVisible, setErrorAlertVisible] = useState<boolean>();

	const MyTextArea = (props: FieldHookConfig<string>) => {
		const [field, meta] = useField(props);

		return (
			<textarea
				className={props.className}
				placeholder={props.placeholder}
				rows={4}
				id={props.id}
				maxLength={500}
				{...field}
			></textarea>
		);
	};

	return (
		<>
			<Formik
				initialValues={{
					name: "",
					email: "",
					message: "",
				}}
				validationSchema={MessageSendSchema}
				onSubmit={(values, { resetForm }) => {
					sendEmail(values.name, values.email, values.message)
						.then((_) => {
							setSuccessAlertVisible(true);
						})
						.catch((_) => {
							setErrorAlertVisible(true);
						})
						.finally(() => {
							resetForm();
						});
				}}
			>
				{({ errors, touched }) => (
					<Form className="message-form">
						<div className="name-email-block">
							<div className="input-block">
								<label className="label" htmlFor="name">
									Your name
								</label>
								<Field
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									className="form-control-input"
									placeholder="John Doe"
									max={50}
								/>
								{errors.name && touched.name ? (
									<span className="text-danger">
										{errors.name}
									</span>
								) : null}
							</div>

							<div className="input-block">
								<label className="label" htmlFor="email">
									Your email
								</label>
								<Field
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="form-control-input"
									placeholder={"john.doe@gmail.com"}
									max={50}
								/>
								{errors.email && touched.email ? (
									<span className="text-danger">
										{errors.email}
									</span>
								) : null}
							</div>
						</div>

						<div className="message-block">
							<div className="message">
								<label className="label" htmlFor="message">
									Message
								</label>
								<MyTextArea
									id="message"
									name="message"
									className="form-control-text-area"
									placeholder="Hi, I have a question to you..."
								></MyTextArea>
								{errors.message && touched.message ? (
									<span className="text-danger">
										{errors.message}
									</span>
								) : null}
							</div>
						</div>

						<div className="">
							<div
								className="g-recaptcha d-inline-block"
								data-callback="onCaptchaSuccess"
								data-sitekey="6Ldy1b0ZAAAAAJZ1t28BkHa-TUBeJ5rvcSe6vX05"
							></div>
							<input
								type="hidden"
								name="GRecaptchaResponse"
								id="GRecaptchaResponse"
							/>
							<span
								id="CaptchaValidation"
								className="text-danger d-block"
							></span>
						</div>

						<div className="button-row">
							<button
								type="submit"
								className="btn btn-outline-light"
								id="SendMessageBtn"
							>
								Send Message
							</button>
						</div>
					</Form>
				)}
			</Formik>

			{
				successAlertVisible && (<div
					className="alert alert-success"
					id="MessageSentAlert"
					role="alert"
				>
					Thanks! Your message has been sent.
					
					<span className="close" onClick={() => setSuccessAlertVisible(false)}></span>
				</div>)
			}

			{
				errorAlertVisible && (<div
					className="alert alert-danger"
					id="MessageErrorAlert"
					role="alert"
				>
					<span className="message-text">
						Something went wrong. Contact me in LinkedIn.
					</span>
					
					<span className="close" onClick={() => setErrorAlertVisible(false)}></span>
				</div>)
			}
		</>
	);
}
