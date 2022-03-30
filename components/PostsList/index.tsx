import { VFC } from "react";
import { PostsListItem } from "components/PostsList/components";
import { AccountPost } from "api";
import styles from "./index.module.scss";

interface PostsListProps {
	posts: AccountPost[];
}

const PostsList: VFC<PostsListProps> = ({ posts }) => {
	return (
		<ul className={styles.list}>
			{posts.map((post) => (
				<PostsListItem key={post.id} post={post} />
			))}
		</ul>
	);
};

export { PostsList };
