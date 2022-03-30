const config = {
	api: {
		host: process.env.NEXT_PUBLIC_API_HOST,
	},
	botUrl: process.env.NEXT_PUBLIC_BOT_URL,
	isDev: process.env.NODE_ENV === "development",
	isDebuggingSSR: process.env.NEXT_PUBLIC_IS_DEBUGGING_SSR === "true",
};

export { config };
