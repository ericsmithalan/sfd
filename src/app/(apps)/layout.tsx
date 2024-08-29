import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../css/globals.css";
import { AppHeader, Flex } from "@/components";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    icons: {
        icon: [
            { url: "/fav-icon.png" },
            new URL("/fav-icon.png", "https://smithfurnituredesign.com"),
            { url: "/fav-icon.png", media: "(prefers-color-scheme: dark)" },
        ],
        shortcut: ["/fav-icon.png"],
        apple: [
            { url: "/apple-icon.png" },
            { url: "/fav-icon.png", sizes: "200x200", type: "image/png" },
        ],
        other: [
            {
                rel: "apple-touch-icon-precomposed",
                url: "/fav-icon.png",
            },
        ],
    },
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
        <html lang="en">
            <body
                className={classNames(
                    inter.className,
                    "w-vw h-vh bg-sfdGray2 text-white"
                )}
            >
                <AppHeader title="Model Viewer" />
                <Flex full="both" dir="col" as="main" className="">
                    {children}
                </Flex>

                <GoogleAnalytics gaId="G-SLPRDNBCMZ" />
            </body>
        </html>
    );
}
