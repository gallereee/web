import "@bd-dm/ui/dist/index.css";
import "@bd-dm/ui/dist/globals.css";
import "../styles/index.css";

import type { AppProps } from "next/app";
import { Container, Layout, UI, useDeviceTheme } from "@bd-dm/ui";
import Head from "next/head";
import { storeWrapper } from "store";
import AbortController from "abort-controller";
import { AuthProvider } from "components/AuthProvider";
import styles from "./_app.module.scss";

// eslint-disable-next-line no-undef
Object.assign(globalThis, {
	AbortController,
});

const App = ({ Component, pageProps }: AppProps) => {
	const theme = useDeviceTheme();

	return (
		<UI theme={theme}>
			<Layout>
				<AuthProvider>
					<Container className={styles.container}>
						<Head>
							<title>Gallereee</title>
							<link rel="icon" href="/favicon.svg" />
						</Head>
						<Component {...pageProps} />
					</Container>
				</AuthProvider>
			</Layout>
		</UI>
	);
};

export default storeWrapper.withRedux(App);
