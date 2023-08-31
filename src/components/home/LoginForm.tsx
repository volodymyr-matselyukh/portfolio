import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { store } from "../../stores/store";
import useLogin from "../../api/userService";
import { observer } from "mobx-react-lite";

const MessageSendSchema = Yup.object().shape({
	email: Yup.string().required("Required"),
	password: Yup.string().required("Required"),
});

export default observer(function LoginForm() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [loginError, setLoginError] = useState<string>("");
	const {login, logout} = useLogin();

	const { userStore } = store;
	const { isLoggedIn, userName } = userStore;

	const [showCaptchaIsNotFilled, setShowCaptchaIsNotFilled] =
		useState<boolean>(false);

	const logOutHandler = () => {
		logout();
	}

	const getLoginForm = () => {
		return (
			<div className="login-form">
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={MessageSendSchema}
					onSubmit={async (values, { resetForm }) => {

						setLoginError("");

						if (recaptchaRef.current) {
							const recaptchaValue =
								recaptchaRef.current.getValue() || "";

							if (!recaptchaValue) {
								setShowCaptchaIsNotFilled(true);
								return;
							}

							setIsLoading(true);

							try {
								await login(values.email, values.password);
								resetForm();
							} catch (err: any) {
								console.error("error happened", err);
								setLoginError(err.response.data.message);
							} finally {
								setIsLoading(false);
							}
						}
					}}
				>
					{({ errors, touched }) => (
						<Form className="message-form">
							<div className="login-password-block">
								<div className="input-block">
									<label className="label" htmlFor="email">
										Login
									</label>
									<Field
										id="email"
										name="email"
										type="text"
										autoComplete="email"
										className="form-control-input"
										placeholder="john.doe@gmail.com"
										max={50}
									/>
									{errors.email && touched.email ? (
										<span className="text-danger">
											{errors.email}
										</span>
									) : null}
								</div>

								<div className="input-block">
									<label className="label" htmlFor="password">
										Password
									</label>
									<Field
										id="password"
										name="password"
										type="password"
										autoComplete="password"
										className="form-control-input"
										max={50}
									/>
									{errors.password && touched.password ? (
										<span className="text-danger">
											{errors.password}
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
								onChange={(_) => {
									setShowCaptchaIsNotFilled(false);
								}}
								size={"compact"}
							/>
							{showCaptchaIsNotFilled && (
								<span className="text-danger">
									Fill the captcha
								</span>
							)}

							<div className="button-row">
								<button
									type="submit"
									className="btn btn-outline-light"
									id="SendMessageBtn"
								>
									<div className="button-content">
										<span className="text">
											{isLoading
												? "Signing in..."
												: "Sign in"}
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
								{ loginError &&
									(
										<span className="text-danger">
											{loginError}
										</span>
									)
								}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		);
	};

	const getAuthenticatedUserForm = () => {
		return (
			<div className="logged-in-form">
				<span className="welcome-text">Welcome, {userName}.</span>
				<Link className="link-to-blog" to={"/blog"}>
					Go to blog dashboard.
				</Link>

				<div className="button-row">
					<button
						type={"button"}
						className="btn btn-outline-light"
						id="SignOut"
						onClick={logOutHandler}
					>
						<div className="button-content">
							<span className="text">
								{isLoading ? "Signing out..." : "Sign out"}
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
				</div>
			</div>
		);
	};

	return <>{isLoggedIn ? getAuthenticatedUserForm() : getLoginForm()}</>;
})
