import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./remixicon.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Smith Furniture Design",
    description:
        "Experience the art of furniture design, tailored to your unique vision.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en">
                <body className={inter.className}>
                    <Header />
                    {children}
                    <SpeedInsights />
                </body>
            </html>
        </>
    );
}
