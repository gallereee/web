import { NextPage } from "next";
import Head from "next/head";
import { SpinnerIcon } from "@bd-dm/ui";
import {
	AuthTelegramWebAppRequest,
	AuthTelegramWebAppResponse,
	useAuthTelegramWebAppMutation,
} from "api/auth";
import { useAppDispatch } from "store";
import { useEffect } from "react";
import { isEmpty, isUndefined } from "lodash";
import { saveAuth } from "utils/auth";
import { auth } from "store/reducers/auth";

import { useRouter } from "next/router";
import { Account, Post } from "api";
import styles from "./index.module.scss";

const getInitDataFromString = (
	initDataString: string
): AuthTelegramWebAppRequest => {
	const result = {} as AuthTelegramWebAppRequest;
	const fields = initDataString.split("&");

	fields.forEach((field) => {
		const [key, value] = field.split("=");
		result[key as keyof AuthTelegramWebAppRequest] = value;
	});

	return result;
};

enum AuthFor {
	MY_GALLEREEE = "my-gallereee",
	SHOW_POST = "show-post",
}

interface AuthParams {
	for: AuthFor;
	"post-id"?: string;
}

const authPathGetters = {
	[AuthFor.MY_GALLEREEE]: (username: Account["username"]) =>
		`/accounts/${username}`,
	[AuthFor.SHOW_POST]: (postId: Post["id"]) => `/posts/${postId}`,
};

const defaultParams = JSON.stringify({
	for: AuthFor.MY_GALLEREEE,
});

const AuthTelegramWebApp: NextPage = () => {
	const [authTelegram] = useAuthTelegramWebAppMutation();
	const {
		push,
		query: { params },
	} = useRouter();
	const dispatch = useAppDispatch();

	const onInitDataReceived = async (initDataString: string): Promise<void> => {
		const initData = getInitDataFromString(initDataString);
		const authDataResponse = await authTelegram(initData);
		const authData = (authDataResponse as { data: AuthTelegramWebAppResponse })
			.data;

		if (isUndefined(authData)) {
			return;
		}

		await saveAuth(authData.accessToken);
		dispatch(auth(authData.accessToken));

		// Redirect
		const typedParams = JSON.parse(
			(params as string) ?? defaultParams
		) as AuthParams;

		let redirectPath;
		switch (typedParams.for) {
			case AuthFor.SHOW_POST: {
				redirectPath = authPathGetters[AuthFor.SHOW_POST](
					typedParams["post-id"] as string
				);
				break;
			}
			case AuthFor.MY_GALLEREEE: {
				redirectPath = authPathGetters[AuthFor.MY_GALLEREEE](
					authData.accountUsername
				);
				break;
			}
			default: {
				redirectPath = "/";
				break;
			}
		}

		await push(redirectPath);
	};

	// Get auth data from Telegram object and send auth request to API
	useEffect(() => {
		const { initData: initDataString } = window.Telegram.WebApp;
		if (isEmpty(initDataString) || isUndefined(params)) {
			return;
		}

		onInitDataReceived(initDataString);
	}, [params]);

	return (
		<>
			<Head>
				<script src="https://telegram.org/js/telegram-web-app.js" />
			</Head>
			<div className={styles.container}>
				<SpinnerIcon />
			</div>
		</>
	);
};

export default AuthTelegramWebApp;
