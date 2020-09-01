import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AppProps } from "next/app";

import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
