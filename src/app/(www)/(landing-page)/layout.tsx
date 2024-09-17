import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../../css/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components";
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
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    formatDetection: {
        email: true,
        address: false,
        telephone: true,
    },

    title: "Smith Furniture Design | Custom Woodworking in Adrian, MI",
    description:
        "Experience the art of furniture design, tailored to your unique vision.",
    keywords:
        "Custom wood furniture Adrian MI, Handcrafted furniture Lenawee County, CNC design Adrian MI, Downloadable STL files Lenawee County, 3D printed furniture Adrian MI, Veteran-owned furniture business MI, Custom furniture design Adrian MI, Custom furniture Blissfield MI, Woodworking Tecumseh MI, CNC design Hudson MI, Handcrafted furniture Morenci MI, Custom cabinetry Clinton MI, 3D printing Deerfield MI, CNC machining Britton MI, Custom furniture Onsted MI, Wood furniture Addison MI, Bespoke furniture Riga MI, 3D printed furniture Cement City MI, Custom furniture design Clayton MI, CNC services Manitou Beach MI, Handcrafted furniture Palmyra MI, Custom woodworking Lenawee County, Local furniture design Adrian MI, Custom-made furniture Blissfield MI, 3D design furniture Tecumseh MI, High-quality woodworking Hudson MI",
    verification: {
        other: {
            "facebook-domain-verification": ["m6bofkvpmmt916f51k8m3na1qi05ac"],
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={classNames(inter.className, "bg-black/10")}>
                <Header fixed />
                {children}
                <Footer />
                <GoogleAnalytics gaId="G-SLPRDNBCMZ" />
            </body>
        </html>
    );
}
