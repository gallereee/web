import { Account, AccountPost, AccountUsername } from "api/accounts/types";
import { api } from "api/baseApi";

const accountsApi = api.injectEndpoints({
	overrideExisting: false,
	endpoints: (build) => ({
		getAccount: build.query<Account, AccountUsername>({
			query: (username) => `accounts/${username}`,
		}),
		getAccountPosts: build.query<AccountPost[], AccountUsername>({
			query: (username) => `accounts/${username}/posts`,
		}),
	}),
});

const { useGetAccountQuery, useGetAccountPostsQuery } = accountsApi;

export { useGetAccountQuery, useGetAccountPostsQuery };
