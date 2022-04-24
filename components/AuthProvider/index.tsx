import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { auth } from "store/reducers/auth";
import { getAuth } from "utils/auth";
import { isNull } from "lodash";

const AuthProvider: FC = ({ children }) => {
	const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			if (isAuthorized) {
				return;
			}

			const accessToken = await getAuth();

			if (isNull(accessToken)) {
				return;
			}

			dispatch(auth(accessToken));
		})();
	}, []);

	return <>{children}</>;
};

export { AuthProvider };
