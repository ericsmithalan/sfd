import { Header } from "@/components";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head></Head>
            <body className="w-full h-full">
                <Header />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
