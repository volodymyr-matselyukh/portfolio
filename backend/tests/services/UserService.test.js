const {createAdminUser, isCredentialsCorrect} = require("../../services/UserService");

test("admin created", async () => {

	process.env = { "ADMIN_PASS": "test", "ADMIN_EMAIL": "volodymyr.test@gmail.com" };
	await createAdminUser();
});

test("validate credentials", async () => {
	let isCredsValid = await isCredentialsCorrect("test", "$2a$10$A8gWDdt4WhDKtssfbfJFpedzSHO7wmoYXpEk5YXEO49W0fgsUT6Z2");
	expect(isCredsValid).toBe(true);

	isCredsValid = await isCredentialsCorrect("test", "$2a$10$iidtB5bLsZDOFxvMF/fC5eNNZT7hQJOePJ6hPY4UOqC788TNGpnsS");
	expect(isCredsValid).toBe(true);

	isCredsValid = await isCredentialsCorrect("test", "$2a$10$iidtB5bLsZDOFxvMF/fC5eNNZT7hQJOePJ6hPY4UOqC788TNGpns1");
	expect(isCredsValid).toBe(false);
});