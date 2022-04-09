import { PhotoId } from "api/photos";
import { Account } from "api/accounts";

type PostId = string;

interface PostPhoto {
	id: PhotoId;
	width: number;
	height: number;
}

interface Post {
	id: PostId;
	createdAt: string;
	updatedAt: string;
	photos: PostPhoto[];
}

type PostWithAccount = Post & { account: Account };

export type { PostId, Post, PostWithAccount, PostPhoto };
