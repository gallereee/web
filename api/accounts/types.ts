type PostId = number;
type PhotoId = number;
type AccountId = number;
type AccountUsername = string;

interface Account {
	id: AccountId;
	username: AccountUsername;
}

interface Photo {
	id: PhotoId;
	postId: PostId;
	createdAt: string;
	updatedAt: string;
}

interface Post {
	id: PostId;
	groupId: string;
	accountId: number;
	createdAt: string;
	updatedAt: string;
	photos: Photo[];
}

export type {
	Account,
	Photo,
	Post,
	PostId,
	PhotoId,
	AccountId,
	AccountUsername,
};
