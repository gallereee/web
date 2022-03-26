import type { AppProps } from "next/app";
import "@bd-dm/ui/dist/index.css";
import "../styles/index.css";
import { Container, Layout, UI, useDeviceTheme } from "@bd-dm/ui";
import { Provider } from "react-redux";
import { store } from "store";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
	const theme = useDeviceTheme();

	return (
		<Provider store={store}>
			<UI theme={theme}>
				<Layout>
					<Container>
						<Head>
							<title>Gallereee</title>
							<link rel="icon" href="/favicon.svg" />
						</Head>
						<Component {...pageProps} />
					</Container>
				</Layout>
			</UI>
		</Provider>
	);
};

export default App;
