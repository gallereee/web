import { VFC } from "react";
import { PostPhoto } from "components/PostPhotos/components";
import { PostPhoto as PostPhotoType } from "api/posts";
import styles from "./index.module.scss";

interface PostPhotosProps {
	photos: PostPhotoType[];
}

const PostPhotos: VFC<PostPhotosProps> = ({ photos }) => {
	return (
		<ul className={styles.list}>
			{photos.map((photo) => (
				<PostPhoto key={photo.id} photo={photo} />
			))}
		</ul>
	);
};

export { PostPhotos };
