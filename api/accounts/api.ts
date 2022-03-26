import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "config";
import { Account, AccountUsername, Post } from "api/accounts/types";

const accountsApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: `${config.api.host}/accounts` }),
	endpoints: (build) => ({
		getAccount: build.query<Account, AccountUsername>({
			query: (username) => `/${username}`,
		}),
		getAccountPosts: build.query<Post[], AccountUsername>({
			query: (username) => `/${username}/posts`,
		}),
	}),
});

const { useGetAccountQuery, useGetAccountPostsQuery } = accountsApi;

export { useGetAccountQuery, useGetAccountPostsQuery, accountsApi };
