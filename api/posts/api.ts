import { PostId, Post } from "api/posts/types";
import { api } from "api/baseApi";

const postsApi = api.injectEndpoints({
	overrideExisting: false,
	endpoints: (build) => ({
		getPost: build.query<Post, PostId>({
			query: (id) => `posts/${id}`,
		}),
	}),
});

const { useGetPostQuery } = postsApi;
const { getPost } = postsApi.endpoints;

export { getPost, useGetPostQuery };
