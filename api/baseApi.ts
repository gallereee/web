import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "store";

const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${config.api.host}/`,
		prepareHeaders: (headers, { getState }) => {
			const { accessToken } = (getState() as RootState).auth;
			if (accessToken) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
	extractRehydrationInfo: (action, { reducerPath }) => {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}

		return undefined;
	},
});

const {
	util: { getRunningOperationPromises },
} = api;

export { api, getRunningOperationPromises };
