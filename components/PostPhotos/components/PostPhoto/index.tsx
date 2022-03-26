import { VFC } from "react";
import { PhotoId } from "api/photos";
import Image from "next/image";
import { config } from "config";
import styles from "./index.module.scss";

interface PostPhotoProps {
	id: PhotoId;
}

const PostPhoto: VFC<PostPhotoProps> = ({ id }) => {
	return (
		<li className={styles.item}>
			<Image
				src={`${config.api.host}/photos/${id}/file`}
				layout="fill"
				objectFit="cover"
			/>
		</li>
	);
};

export { PostPhoto };
