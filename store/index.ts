import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "api";
import { createWrapper } from "next-redux-wrapper";
import { config } from "../config";

export const makeStore = () =>
	configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(api.middleware),
	});

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const storeWrapper = createWrapper<AppStore>(makeStore, {
	debug: config.isDebuggingSSR,
});

export type { AppStore, RootState, AppDispatch };
export { useAppDispatch, useAppSelector, storeWrapper };
