import { VFC } from "react";
import Image from "next/image";
import { config } from "config";
import { AccountPost } from "api";
import Link from "next/link";
import { blurImageBase64 } from "stubs/blurImageBase64";
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
						width={300}
						height={300}
						priority
						objectFit="cover"
						placeholder="blur"
						blurDataURL={blurImageBase64}
					/>
				</a>
			</Link>
		</li>
	);
};

export { PostsListItem };
