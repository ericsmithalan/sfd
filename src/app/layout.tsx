import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./remixicon.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    openGraph: {
        locale: "en",

        title: "Smith Furniture Design | Custom Woodworking in Adrian, MI",
        type: "website",
        url: "https://www.smithfurnituredesign.com",
        images: "https://www.smithfurnituredesign.com/images/social-media/sfd.png",
        description:
            "Experience the art of furniture design, tailored to your unique vision.",
    },
    title: "Smith Furniture Design | Custom Woodworking in Adrian, MI",
    description:
        "Experience the art of furniture design, tailored to your unique vision.",
    keywords:
        "Custom wood furniture Adrian MI, Handcrafted furniture Lenawee County, CNC design Adrian MI, Downloadable STL files Lenawee County, 3D printed furniture Adrian MI, Veteran-owned furniture business MI, Custom furniture design Adrian MI, Custom furniture Blissfield MI, Woodworking Tecumseh MI, CNC design Hudson MI, Handcrafted furniture Morenci MI, Custom cabinetry Clinton MI, 3D printing Deerfield MI, CNC machining Britton MI, Custom furniture Onsted MI, Wood furniture Addison MI, Bespoke furniture Riga MI, 3D printed furniture Cement City MI, Custom furniture design Clayton MI, CNC services Manitou Beach MI, Handcrafted furniture Palmyra MI, Custom woodworking Lenawee County, Local furniture design Adrian MI, Custom-made furniture Blissfield MI, 3D design furniture Tecumseh MI, High-quality woodworking Hudson MI",
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
                    <Footer />
                    <SpeedInsights />
                    <GoogleAnalytics gaId="G-SLPRDNBCMZ" />
                </body>
            </html>
        </>
    );
}
