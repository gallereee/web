import { VFC } from "react";
import Image from "next/image";
import { config } from "config";
import { AccountPost } from "api";
import styles from "./index.module.scss";

interface PostsListItemProps {
	post: AccountPost;
}

const PostsListItem: VFC<PostsListItemProps> = ({ post: { coverPhotoId } }) => {
	return (
		<li className={styles.item}>
			<Image
				src={`${config.api.host}/photos/${coverPhotoId}/file`}
				layout="fill"
				objectFit="cover"
			/>
		</li>
	);
};

export { PostsListItem };
