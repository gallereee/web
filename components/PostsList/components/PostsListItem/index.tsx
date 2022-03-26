import { VFC } from "react";
import { Post } from "api";
import Image from "next/image";
import { config } from "config";
import styles from "./index.module.scss";

interface PostsListItemProps {
	post: Post;
}

const PostsListItem: VFC<PostsListItemProps> = ({
	post: {
		photos: [photo],
	},
}) => {
	const photoId = photo.id;

	return (
		<li className={styles.item}>
			<Image
				src={`${config.api.host}/photos/${photoId}/file`}
				layout="fill"
				objectFit="cover"
			/>
		</li>
	);
};

export { PostsListItem };
