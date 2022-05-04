import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, Font, Row, SpinnerIcon } from "@bd-dm/ui";
import { isString, isUndefined } from "lodash";
import { PostPhotos } from "components/PostPhotos";
import { getPost, getRunningOperationPromises, useGetPostQuery } from "api";
import { storeWrapper, useAppSelector } from "store";
import { formatDate } from "utils";
import { PostDropdown } from "components/PostDropdown";
import styles from "./index.module.scss";

const PostPage: NextPage = () => {
	const {
		query: { id },
	} = useRouter();

	const { data: post, isLoading } = useGetPostQuery(id as string, {
		skip: isUndefined(id),
	});
	const authUsername = useAppSelector((state) => state.auth.username);

	if (isLoading) {
		return <SpinnerIcon />;
	}

	if (isUndefined(post)) {
		return null;
	}

	const {
		account: { username },
		createdAt,
	} = post;

	return (
		<>
			<Column className={styles.container}>
				<Row
					verticalAlignment={Row.VerticalAlignment.CENTER}
					horizontalAlignment={Row.HorizontalAlignment.SPACE_BETWEEN}
				>
					<Row verticalAlignment={Row.VerticalAlignment.CENTER}>
						<a href={`/accounts/${username}`}>
							<Font className={styles.username} type={Font.Type.H2}>
								{username}
							</Font>
						</a>
						<Font className={styles.date}>{formatDate(createdAt)}</Font>
					</Row>
					{authUsername === username ? (
						<PostDropdown postId={post.id} username={username} />
					) : null}
				</Row>
				<PostPhotos photos={post.photos} />
			</Column>
		</>
	);
};

const getServerSideProps = storeWrapper.getServerSideProps(
	(store) => async (context) => {
		const { id } = context.query;
		if (isString(id)) {
			store.dispatch(getPost.initiate(id));
		}
		const [getPostResult] = await Promise.all<any>(
			getRunningOperationPromises()
		);

		if (getPostResult.isError && getPostResult.error?.status === 404) {
			return {
				notFound: true,
			};
		}

		return {
			props: {},
		};
	}
);

export { getServerSideProps };
export default PostPage;
