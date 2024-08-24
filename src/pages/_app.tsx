import type { AppProps } from "next/app";
import Head from "next/head";
import "../scss/index.scss";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
