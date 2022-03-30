import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, Font, SpinnerIcon } from "@bd-dm/ui";
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
import { storeWrapper } from "store";
import styles from "./index.module.scss";

const AccountPage: NextPage = () => {
	const { query } = useRouter();

	const { data: account, isLoading: isGetAccountLoading } = useGetAccountQuery(
		query.username as string,
		{
			skip: isUndefined(query.username),
		}
	);
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
				<Font type={Font.Type.H2}>{username}</Font>
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
		await Promise.all(getRunningOperationPromises());

		return {
			props: {},
		};
	}
);

export { getServerSideProps };
export default AccountPage;
