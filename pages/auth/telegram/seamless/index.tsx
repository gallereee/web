import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthTelegramSeamlessMutation } from "api/auth";
import { useEffect } from "react";
import { isEmpty, isUndefined } from "lodash";
import { saveAuth } from "utils/auth";
import { useAppDispatch } from "store";
import { auth } from "store/reducers/auth";

const AuthTelegramSeamless: NextPage = () => {
	const { query, push } = useRouter();
	const [authTelegram, { data: authData }] = useAuthTelegramSeamlessMutation();
	const dispatch = useAppDispatch();

	const authFields = {
		id: query.id as string,
		hash: query.hash as string,
		first_name: query.first_name as string,
		last_name: query.last_name as string,
		username: query.username as string,
		photo_url: query.photo_url as string,
		auth_date: query.auth_date as string,
	};

	useEffect(() => {
		if (isEmpty(query)) {
			return;
		}

		authTelegram(authFields);
	}, [query]);

	useEffect(() => {
		(async () => {
			if (isUndefined(authData) || isUndefined(authData.accessToken)) {
				return;
			}

			await saveAuth(authData.accessToken);
			dispatch(auth(authData.accessToken));
			await push(`/accounts/${authFields.username}`);
		})();
	}, [authData]);

	return <p>seamless</p>;
};

export default AuthTelegramSeamless;
