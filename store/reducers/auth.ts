import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthJwtPayload, AuthJwtToken } from "api/auth";
import jwtDecode from "jwt-decode";

interface AuthState {
	isAuthorized: boolean;
	accessToken: string;
	username: string;
}

const initialState: AuthState = {
	isAuthorized: false,
	accessToken: "",
	username: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		auth(state, { payload: accessToken }: PayloadAction<AuthJwtToken>) {
			const account = jwtDecode(accessToken) as AuthJwtPayload;

			state.isAuthorized = true;
			state.accessToken = accessToken;
			state.username = account.username;
		},
	},
});

export const { auth } = authSlice.actions;
export { authSlice };
