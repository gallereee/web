interface AuthTelegramSeamlessRequest {
	id: string;
	hash: string;
	first_name: string;
	last_name: string;
	auth_date: string;
	photo_url: string;
	username: string;
}

interface AuthTelegramSeamlessResponse {
	accessToken: string;
}

interface AuthTelegramWebAppRequest {
	query_id: string;
	hash: string;
	user: string;
	auth_date: string;
}

interface AuthTelegramWebAppResponse {
	accessToken: string;
}

interface AuthJwtPayload {
	id: string;
	username: string;
}

type AuthJwtToken = string;

export type {
	AuthTelegramSeamlessRequest,
	AuthTelegramSeamlessResponse,
	AuthTelegramWebAppRequest,
	AuthTelegramWebAppResponse,
	AuthJwtPayload,
	AuthJwtToken,
};
