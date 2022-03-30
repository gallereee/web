import { PhotoId } from "api/photos";

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

export type { PostId, Post, PostPhoto };
