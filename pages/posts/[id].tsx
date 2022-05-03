import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, Dropdown, Font, Row, SpinnerIcon } from "@bd-dm/ui";
import { isString, isUndefined } from "lodash";
import { PostPhotos } from "components/PostPhotos";
import {
	getPost,
	getRunningOperationPromises,
	useDeletePostMutation,
	useGetPostQuery,
} from "api";
import { storeWrapper, useAppSelector } from "store";
import { formatDate } from "utils";
import styles from "./index.module.scss";

const PostPage: NextPage = () => {
	const {
		query: { id },
		push,
	} = useRouter();

	const { data: post, isLoading } = useGetPostQuery(id as string, {
		skip: isUndefined(id),
	});
	const authUsername = useAppSelector((state) => state.auth.username);
	const [deletePost] = useDeletePostMutation();

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

	const onDeleteClick = async () => {
		const isAgree = window.confirm("Вы уверены, что хотите удалить фото?");
		if (!isAgree) {
			return;
		}

		await deletePost(post.id);
		await push(`/accounts/${username}`);
	};

	return (
		<Column className={styles.container}>
			<Row
				verticalAlignment={Row.VerticalAlignment.CENTER}
				horizontalAlignment={Row.HorizontalAlignment.SPACE_BETWEEN}
			>
				<Row verticalAlignment={Row.VerticalAlignment.CENTER}>
					<a href={`/accounts/${username}`}>
						<Font type={Font.Type.H2}>{username}</Font>
					</a>
					<Font className={styles.date}>{formatDate(createdAt)}</Font>
				</Row>
				{authUsername === username ? (
					<div className={styles.dropdown}>
						<Dropdown>
							<Dropdown.Button />
							<Dropdown.List
								items={[{ children: "Удалить", onClick: onDeleteClick }]}
								position={Dropdown.ListPosition.RIGHT}
							/>
						</Dropdown>
					</div>
				) : null}
			</Row>
			<PostPhotos photos={post.photos} />
		</Column>
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
