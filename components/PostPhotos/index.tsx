import { VFC } from "react";
import { PostPhoto } from "components/PostPhotos/components";
import { PostPhoto as PostPhotoType } from "api/posts";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./index.module.scss";

interface PostPhotosProps {
	photos: PostPhotoType[];
}

const PostPhotos: VFC<PostPhotosProps> = ({ photos }) => {
	return (
		<div className={styles.container}>
			<Carousel
				showArrows={false}
				showStatus={false}
				dynamicHeight
				emulateTouch
				useKeyboardArrows
			>
				{photos.map((photo) => (
					<PostPhoto key={photo.id} photo={photo} />
				))}
			</Carousel>
		</div>
	);
};

export { PostPhotos };
