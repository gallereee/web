import { api } from "api/baseApi";
import { AuthTelegramRequest, AuthTelegramResponse } from "./types";

const authApi = api.injectEndpoints({
	overrideExisting: false,
	endpoints: (build) => ({
		authTelegram: build.mutation<AuthTelegramResponse, AuthTelegramRequest>({
			query: (body) => ({
				url: "auth/telegram",
				method: "POST",
				body,
			}),
		}),
	}),
});

const { useAuthTelegramMutation } = authApi;

export { useAuthTelegramMutation };
