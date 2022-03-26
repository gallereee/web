import { NextPage } from "next";
import { useRouter } from "next/router";
import { Font } from "@bd-dm/ui";

const AccountPage: NextPage = () => {
	const {
		query: { username },
	} = useRouter();

	return <Font>{username}</Font>;
};

export default AccountPage;
