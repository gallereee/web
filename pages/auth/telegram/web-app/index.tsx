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

const AuthTelegramWebApp: NextPage = () => {
	const [authTelegram] = useAuthTelegramWebAppMutation();
	const { push } = useRouter();
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

		await push(`/accounts/${authData.accountUsername}`);
	};

	// Get auth data from Telegram object and send auth request to API
	useEffect(() => {
		const { initData: initDataString } = window.Telegram.WebApp;
		if (isEmpty(initDataString)) {
			return;
		}

		onInitDataReceived(initDataString);
	}, []);

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
