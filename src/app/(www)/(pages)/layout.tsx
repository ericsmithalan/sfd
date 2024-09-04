import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../../css/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header fixed className="" />
                {children}
                <Footer />
                <GoogleAnalytics gaId="G-SLPRDNBCMZ" />
            </body>
        </html>
    );
}
