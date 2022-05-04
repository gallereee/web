import { VFC } from "react";
import { PostsListItem } from "components/PostsList/components";
import { AccountPost } from "api";
import { Font, Row } from "@bd-dm/ui";
import styles from "./index.module.scss";

interface PostsListProps {
	posts: AccountPost[];
}

const PostsList: VFC<PostsListProps> = ({ posts }) => {
	return (
		<>
			{posts.length === 0 ? (
				<Row horizontalAlignment={Row.HorizontalAlignment.CENTER}>
					<Font>Пока нет публикаций</Font>
				</Row>
			) : null}
			<ul className={styles.list}>
				{posts.map((post) => (
					<PostsListItem key={post.id} post={post} />
				))}
			</ul>
		</>
	);
};

export { PostsList };
