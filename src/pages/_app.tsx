import type { AppProps } from "next/app";
import Head from "next/head";
import "../scss/index.scss";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
