export default null;

declare global {
	interface Window {
		Telegram: {
			WebApp: {
				initData: string;
				colorScheme: string;
			};
		};
	}
}
