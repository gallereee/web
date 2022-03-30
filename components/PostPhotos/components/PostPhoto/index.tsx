import { VFC } from "react";
import { PostPhoto as PostPhotoType } from "api/posts";
import Image from "next/image";
import { config } from "config";
import styles from "./index.module.scss";

interface PostPhotoProps {
	photo: PostPhotoType;
}

const PostPhoto: VFC<PostPhotoProps> = ({ photo: { id, width, height } }) => {
	return (
		<li className={styles.item}>
			<Image
				src={`${config.api.host}/photos/${id}/file`}
				layout="responsive"
				width={width}
				height={height}
				priority
			/>
		</li>
	);
};

export { PostPhoto };
