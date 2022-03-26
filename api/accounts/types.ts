import { PostId } from "api/posts";
import { PhotoId } from "api/photos";

type AccountId = number;
type AccountUsername = string;

interface Account {
	id: AccountId;
	username: AccountUsername;
}

interface AccountPost {
	id: PostId;
	createdAt: string;
	updatedAt: string;
	coverPhotoId: PhotoId;
}

export type { Account, AccountPost, AccountId, AccountUsername };
