import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
	AuthTelegramWebAppRequest,
	useAuthTelegramWebAppMutation,
} from "api/auth";
import { useAppDispatch } from "store";
import { useEffect, useState } from "react";
import { isEmpty, isUndefined } from "lodash";
import { saveAuth } from "utils/auth";
import { auth } from "store/reducers/auth";

const getInitData = (initDataString: string): AuthTelegramWebAppRequest => {
	const result: any = {};
	const fields = initDataString.split("&");
	fields.forEach((field) => {
		const [key, value] = field.split("=");
		result[key] = value;
	});

	return result;
};

const AuthTelegramWebApp: NextPage = () => {
	const [initData, setInitData] = useState<
		AuthTelegramWebAppRequest | undefined
	>();
	const { push } = useRouter();
	const [authTelegram, { data: authData }] = useAuthTelegramWebAppMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		// @ts-ignore
		const webAppInitData = window.Telegram.WebApp.initData;
		if (isEmpty(webAppInitData)) {
			return;
		}

		const initDataObject = getInitData(webAppInitData);

		setInitData(initDataObject);
		authTelegram(initDataObject);
	}, []);

	useEffect(() => {
		(async () => {
			if (
				isUndefined(authData) ||
				isUndefined(authData.accessToken) ||
				isUndefined(initData)
			) {
				return;
			}

			const userString = decodeURI(initData.user);
			const user = JSON.parse(userString);

			await saveAuth(authData.accessToken);
			dispatch(auth(authData.accessToken));
			await push(`/accounts/${user.username}`);
		})();
	}, [authData, initData]);

	return (
		<>
			<Head>
				<script src="https://telegram.org/js/telegram-web-app.js" />
			</Head>
			<div>
				<p>Telegram initData: {JSON.stringify(initData || "")}</p>
			</div>
		</>
	);
};

export default AuthTelegramWebApp;
