import { NextPage } from "next";
import { useRouter } from "next/router";
import { Column, Font } from "@bd-dm/ui";
import Head from "next/head";
import { isUndefined } from "lodash";
import { PostsList } from "components";
import styles from "./index.module.scss";

const AccountPage: NextPage = () => {
	const {
		query: { username },
	} = useRouter();

	if (isUndefined(username)) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{username} - Gallereee</title>
			</Head>
			<Column className={styles.column}>
				<Font type={Font.Type.H2}>{username}</Font>
				<PostsList username={username as string} />
			</Column>
		</>
	);
};

export default AccountPage;
