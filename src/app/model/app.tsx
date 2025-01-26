import { ViewportProvider } from "@/context";

const MyApp = (props: any) => {
    const { Component, pageProps, err } = props;

    return (
        <ViewportProvider>
            <Component {...pageProps} err={err} />
        </ViewportProvider>
    );
};

export default MyApp;
