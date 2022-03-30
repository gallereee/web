import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { HYDRATE } from "next-redux-wrapper";

const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `${config.api.host}/` }),
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
