import { Formik, Form, Field, useField, FieldHookConfig } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import useEmail from "../../api/emailService";
import MyTextArea from "../controls/MyTextArea";

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
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [timeoutRef, setTimeoutRef] = useState<any>();
	const [showCaptchaIsNotFilled, setShowCaptchaIsNotFilled] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const sendEmail = useEmail();

	useEffect(() => {
		return () => {
			setTimeoutRef(0);
		};
	}, []);

	const clearAlerts = () => {
		setSuccessAlertVisible(false);
		setErrorAlertVisible(false);
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
					if (recaptchaRef.current) {
						setIsLoading(true);
						clearAlerts();

						const recaptchaValue =
							recaptchaRef.current.getValue() || "";

						if(!recaptchaValue)
						{
							setShowCaptchaIsNotFilled(true);
							return;
						}

						sendEmail(
							values.name,
							values.email,
							values.message,
							recaptchaValue
						)
							.then((_) => {
								setSuccessAlertVisible(true);
								resetForm();
							})
							.catch((_) => {
								setErrorAlertVisible(true);
							})
							.finally(() => {
								recaptchaRef.current?.reset();

								setTimeoutRef(
									setInterval(() => {
										clearAlerts();
									}, 8000)
								);
								setIsLoading(false);
							});
					}
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
									rows={4}
								></MyTextArea>
								{errors.message && touched.message ? (
									<span className="text-danger">
										{errors.message}
									</span>
								) : null}
							</div>
						</div>

						<ReCAPTCHA
							ref={recaptchaRef}
							sitekey={
								process.env
									.REACT_APP_CAPTCHA_CLIENT_KEY as string
							}
							className="recapcha"
							onChange={_ => {
								setShowCaptchaIsNotFilled(false);
							}}
						/>
						{showCaptchaIsNotFilled && <span className="text-danger">Fill the captcha</span>}

						<div className="button-row">
							<button
								type="submit"
								className="btn btn-outline-light"
								id="SendMessageBtn"
							>
								<div className="button-content">
									<span className="text">{isLoading ? "Sending..." : "Send Message"}</span>

									{isLoading && (<img src="./images/loading-icon.gif" alt="loading" className="loading-icon"></img>)}
									
								</div>
							</button>
						</div>
					</Form>
				)}
			</Formik>

			{successAlertVisible && (
				<div
					className="alert alert-success"
					id="MessageSentAlert"
					role="alert"
				>
					Thanks! Your message has been sent.
					<span
						className="close"
						onClick={() => setSuccessAlertVisible(false)}
					></span>
				</div>
			)}

			{errorAlertVisible && (
				<div
					className="alert alert-danger"
					id="MessageErrorAlert"
					role="alert"
				>
					<span className="message-text">
						Something went wrong. Contact me in LinkedIn.
					</span>

					<span
						className="close"
						onClick={() => setErrorAlertVisible(false)}
					></span>
				</div>
			)}
		</>
	);
}
