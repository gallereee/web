import { VFC } from "react";
import { PostId } from "api/posts";
import { SpinnerIcon } from "@bd-dm/ui";
import { isUndefined } from "lodash";
import { useGetPostQuery } from "api";
import { PostPhoto } from "components/PostPhotos/components";
import styles from "./index.module.scss";

interface PostPhotosProps {
	id: PostId;
}

const PostPhotos: VFC<PostPhotosProps> = ({ id }) => {
	const { data: post, isLoading } = useGetPostQuery(id);

	if (isLoading) {
		return <SpinnerIcon />;
	}

	if (isUndefined(post)) {
		return null;
	}

	return (
		<ul className={styles.list}>
			{post.photoIds.map((photoId) => (
				<PostPhoto key={photoId} id={photoId} />
			))}
		</ul>
	);
};

export { PostPhotos };
