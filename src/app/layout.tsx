import clsx from "clsx";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../scss/index.scss";

const inter = Inter({ subsets: ["latin"] });

type WebLayoutProps = {
    children?: ReactNode;
};

const RootLayout = async ({ children }: WebLayoutProps) => {
    return (
        <html>
            <head></head>
            <body className={clsx(inter.className)}>
                {children}
                {/* <GoogleAnalytics gaId="" /> */}
            </body>
        </html>
    );
};

export default RootLayout;
