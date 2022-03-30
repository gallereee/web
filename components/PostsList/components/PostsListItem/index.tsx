import { VFC } from "react";
import Image from "next/image";
import { config } from "config";
import { AccountPost } from "api";
import Link from "next/link";
import styles from "./index.module.scss";

interface PostsListItemProps {
	post: AccountPost;
}

const PostsListItem: VFC<PostsListItemProps> = ({
	post: { id, coverPhotoId },
}) => {
	return (
		<li className={styles.item}>
			<Link href={`/post/${id}`}>
				<a className={styles.button}>
					<Image
						src={`${config.api.host}/photos/${coverPhotoId}/file`}
						layout="fill"
						objectFit="cover"
						priority
					/>
				</a>
			</Link>
		</li>
	);
};

export { PostsListItem };
