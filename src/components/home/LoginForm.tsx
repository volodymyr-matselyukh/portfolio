import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";

const MessageSendSchema = Yup.object().shape({
	login: Yup.string()
		.required("Required"),
	password: Yup.string()
		.required("Required")
});

export default function LoginForm() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showCaptchaIsNotFilled, setShowCaptchaIsNotFilled] = useState<boolean>(false);

	return (
		<div className="login-form">
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

						const recaptchaValue =
							recaptchaRef.current.getValue() || "";

						if(!recaptchaValue)
						{
							setShowCaptchaIsNotFilled(true);
							return;
						}

						// login(
						// 	values.name,
						// 	values.email,
						// 	values.message,
						// 	recaptchaValue
						// )
						// 	.then((_) => {
						// 		setSuccessAlertVisible(true);
						// 		resetForm();
						// 	})
						// 	.catch((_) => {
						// 		setErrorAlertVisible(true);
						// 	})
						// 	.finally(() => {
						// 		recaptchaRef.current?.reset();

						// 		setTimeoutRef(
						// 			setInterval(() => {
						// 				clearAlerts();
						// 			}, 8000)
						// 		);
						// 		setIsLoading(false);
						// 	});
					}
				}}
			>
				{({ errors, touched }) => (
					<Form className="message-form">
						<div className="login-password-block">
							<div className="input-block">
								<label className="label" htmlFor="name">
									Login
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
									Password
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
							size={"compact"}
						/>
						{showCaptchaIsNotFilled && <span className="text-danger">Fill the captcha</span>}

						<div className="button-row">
							<button
								type="submit"
								className="btn btn-outline-light"
								id="SendMessageBtn"
							>
								<div className="button-content">
									<span className="text">{isLoading ? "Signing in..." : "Sign in"}</span>

									{isLoading && (<img src="./images/loading-icon.gif" alt="loading" className="loading-icon"></img>)}
									
								</div>
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}