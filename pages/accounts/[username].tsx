import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, Font, Row, SpinnerIcon } from "@bd-dm/ui";
import Head from "next/head";
import { isString, isUndefined } from "lodash";
import { PostsList } from "components/PostsList";
import {
	getAccount,
	getAccountPosts,
	getRunningOperationPromises,
	useGetAccountPostsQuery,
	useGetAccountQuery,
} from "api";
import { storeWrapper, useAppSelector } from "store";
import styles from "./index.module.scss";

const AccountPage: NextPage = () => {
	const { query } = useRouter();

	const { data: account, isLoading: isGetAccountLoading } = useGetAccountQuery(
		query.username as string,
		{
			skip: isUndefined(query.username),
		}
	);
	const authUsername = useAppSelector((state) => state.auth.username);
	const { data: posts, isLoading: isGetAccountPostsLoading } =
		useGetAccountPostsQuery(query.username as string, {
			skip: isUndefined(query.username),
		});

	const isLoading = isGetAccountLoading || isGetAccountPostsLoading;

	if (isLoading) {
		return <SpinnerIcon />;
	}

	if (isUndefined(account) || isUndefined(posts)) {
		return null;
	}

	const { username } = account;

	return (
		<>
			<Head>
				<title>{username} - Gallereee</title>
			</Head>
			<Column className={styles.column}>
				<Row verticalAlignment={Row.VerticalAlignment.CENTER}>
					<Font type={Font.Type.H2}>{username}</Font>
					{authUsername === username ? (
						<Font className={styles.youSign}>Вы</Font>
					) : null}
				</Row>
				<PostsList posts={posts} />
			</Column>
		</>
	);
};

const getServerSideProps = storeWrapper.getServerSideProps(
	(store) => async (context) => {
		const { username } = context.query;
		if (isString(username)) {
			store.dispatch(getAccount.initiate(username));
			store.dispatch(getAccountPosts.initiate(username));
		}
		const [getAccountResult] = await Promise.all<any>(
			getRunningOperationPromises()
		);

		if (getAccountResult.isError && getAccountResult.error?.status === 404) {
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
export default AccountPage;
