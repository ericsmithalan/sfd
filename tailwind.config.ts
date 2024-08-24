import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: ["flex", "flex-col", "flex-row"],
    theme: {
        container: {
            screens: {
                xsm: "475px",
                sm: "600px",
                md: "728px",
                lg: "984px",
                xl: "1240px",
            },
        },
        screens: {
            xsm: "475px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
        extend: {
            height: {
                header: "100px",
            },
            fontFamily: {
                sans: ["Inter", "system-ui"],
                serif: ["Raleway", "system-ui"],
            },
            screens: {
                xs: "480px",
                ss: "620px",
                sm: "768px",
                md: "1060px",
                lg: "1200px",
                xl: "1700px",
            },
            colors: {
                sfdPrimary0: "#C18434",
                sfdPrimary1: "#B88A4E",
                sfdPrimary2: "#CEAF86",
                sfdPrimary3: "#D5B895",
                sfdPrimary4: "#EADECC",
                sfdPrimary5: "#FBF9F7",

                sfdSecondary0: "#3E4A4A",
                sfdSecondary1: "#687877",
                sfdSecondary2: "#7C8B8B",
                sfdSecondary3: "#BABABA",
                sfdSecondary4: "#D8D8D8",
                sfdSecondary5: "#F5F5F5",

                sfdGray0: "#1A1A1A",
                sfdGray1: "#272727",
                sfdGray2: "#343434",
                sfdGray3: "#BABABA",
                sfdGray4: "#D8D8D8",
                sfdGray5: "#F5F5F5",
            },
        },
    },

    plugins: [
        // require("@tailwindcss/typography"),
        // require("@tailwindcss/forms"),
        // require("@tailwindcss/aspect-ratio"),
        // require("@tailwindcss/container-queries"),
    ],
};
export default config;
