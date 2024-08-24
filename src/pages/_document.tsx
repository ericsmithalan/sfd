import { Header } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
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
            <body className="w-full h-full">
                <Header />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
