import type { AppProps } from "next/app";
import "@bd-dm/ui/dist/index.css";
import "../styles/index.css";
import { Layout, UI, useDeviceTheme } from "@bd-dm/ui";

const App = ({ Component, pageProps }: AppProps) => {
	const theme = useDeviceTheme();

	return (
		<UI theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UI>
	);
};

export default App;
