import { PhotoId } from "api/photos";

type PostId = string;

interface Post {
	id: PostId;
	createdAt: string;
	updatedAt: string;
	photoIds: PhotoId[];
}

export type { PostId, Post };
