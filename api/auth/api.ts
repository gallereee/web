import { api } from "api/baseApi";
import {
	AuthTelegramSeamlessRequest,
	AuthTelegramSeamlessResponse,
	AuthTelegramWebAppRequest,
	AuthTelegramWebAppResponse,
} from "./types";

const authApi = api.injectEndpoints({
	overrideExisting: false,
	endpoints: (build) => ({
		authTelegramSeamless: build.mutation<
			AuthTelegramSeamlessResponse,
			AuthTelegramSeamlessRequest
		>({
			query: (body) => ({
				url: "auth/telegram/seamless",
				method: "POST",
				body,
			}),
		}),
		authTelegramWebApp: build.mutation<
			AuthTelegramWebAppResponse,
			AuthTelegramWebAppRequest
		>({
			query: (body) => ({
				url: "auth/telegram/web-app",
				method: "POST",
				body,
			}),
		}),
	}),
});

const { useAuthTelegramSeamlessMutation, useAuthTelegramWebAppMutation } =
	authApi;

export { useAuthTelegramSeamlessMutation, useAuthTelegramWebAppMutation };
