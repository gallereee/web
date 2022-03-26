import { VFC } from "react";
import { PostsListItem } from "components/PostsList/components";
import { AccountUsername, useGetAccountPostsQuery } from "api";
import { SpinnerIcon } from "@bd-dm/ui";
import { isUndefined } from "lodash";
import styles from "./index.module.scss";

interface PostsListProps {
	username: AccountUsername;
}

const PostsList: VFC<PostsListProps> = ({ username }) => {
	const { data: posts, isLoading } = useGetAccountPostsQuery(
		username as string
	);

	if (isLoading) {
		return <SpinnerIcon />;
	}

	if (isUndefined(posts)) {
		return null;
	}

	return (
		<ul className={styles.list}>
			{posts.map((post) => (
				<PostsListItem key={post.id} post={post} />
			))}
		</ul>
	);
};

export { PostsList };
