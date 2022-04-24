import { NextPage } from "next";
import Head from "next/head";

const AuthTelegramWebApp: NextPage = () => {
	return (
		<>
			<Head>
				<script src="https://telegram.org/js/telegram-web-app.js" />
			</Head>
			<p>web app</p>
		</>
	);
};

export default AuthTelegramWebApp;
