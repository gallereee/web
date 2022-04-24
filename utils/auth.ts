const ACCESS_TOKEN_KEY = "accessToken";

const saveAuth = async (accessToken: string) => {
	await localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

const getAuth = async () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export { saveAuth, getAuth };
