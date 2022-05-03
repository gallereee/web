import { PostId, PostWithAccount } from "api/posts/types";
import { api } from "api/baseApi";

const postsApi = api.injectEndpoints({
	overrideExisting: false,
	endpoints: (build) => ({
		getPost: build.query<PostWithAccount, PostId>({
			query: (id) => `posts/${id}`,
		}),
		deletePost: build.mutation<void, PostId>({
			query: (id) => ({
				url: `posts/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

const { useGetPostQuery, useDeletePostMutation } = postsApi;
const { getPost } = postsApi.endpoints;

export { getPost, useGetPostQuery, useDeletePostMutation };
