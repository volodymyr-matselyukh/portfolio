export default interface LoginResponse{
	message: string,
	data: {
		userName: string,
		token: string
	}
};