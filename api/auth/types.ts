interface AuthTelegramRequest {
	id: string;
	hash: string;
	first_name: string;
	last_name: string;
	auth_date: string;
	photo_url: string;
	username: string;
}

interface AuthTelegramResponse {
	accessToken: string;
}

interface AuthJwtPayload {
	id: string;
	username: string;
}

type AuthJwtToken = string;

export type {
	AuthTelegramRequest,
	AuthTelegramResponse,
	AuthJwtPayload,
	AuthJwtToken,
};
