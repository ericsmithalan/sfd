"use client";
import { useContactInfo } from "@/hooks";
import { ButtonLink, Flex } from "../";
import classNames from "classnames";

interface HomeHeroProps {}

export const HomeHero = ({}: HomeHeroProps) => {
    const { email, phone } = useContactInfo();

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`tel:${phone}`);
    };
    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`mailto:${email}`);
    };

    return (
        <Flex
            as="section"
            flex="auto"
            dir="col"
            className={classNames(
                "bg-home-hero-mobile bg-sfdSecondary1 bg-cover bg-right-top",
                "w-screen pb-44 text-white",
                "lg:bg-home-hero",
                "md:bg-home-hero",
                "sm:bg-home-hero-tablet"
            )}
        >
            <div className="h-header"></div>
            <Flex
                as="div"
                dir="col"
                flex="auto"
                contain
                className={classNames(
                    "mt-12 pl-10 pr-10",
                    "lg:mt-14 lg:pl-20 lg:pr-20",
                    "md:mt-20 md:pl-20 md:pr-20",
                    "sm:mt-20",
                    "xsm:mt-20"
                )}
            >
                <h1
                    className={classNames(
                        "text-4xl leading-tight font-light text-shadow-lg",
                        "sm:text-7xl sm:max-w-[500px]",
                        "md:text-7xl md:max-w-[500px]",
                        "lg:text-7xl md:max-w-[500px]"
                    )}
                >
                    Design<span className="font-extralight">. </span>
                    Build<span className="font-extralight">. </span>
                    <span className="text-sfdPrimary3">Inspire</span>
                    <span className="font-extralight">. </span>
                </h1>
                <h2
                    className={classNames(
                        "text-sm leading-tight mt-6 font-light text-shadow-lg text-white/70",
                        "sm:w-[400px] text-sm sm:mt-6",
                        "md:w-[600px] text-xl",
                        "lg:w-[450px] text-2xl"
                    )}
                >
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </h2>
                <Flex
                    as="div"
                    dir="row"
                    className={classNames(
                        "gap-14 mt-10 max-w-[200px] border-b-2 pb-4 border-dotted border-sfdPrimary2 text-xl",
                        "sm:max-w-[350px]",
                        "md:max-w-[250px]",
                        "lg:max-w-[250px]"
                    )}
                >
                    <ButtonLink
                        href={`#`}
                        onClick={handlePhoneClick}
                        icon="phone-line"
                        className={classNames(
                            "text-lg",
                            "sm:text-xl",
                            "md:text-xl",
                            "lg:text-xl"
                        )}
                    >
                        Call
                    </ButtonLink>
                    <ButtonLink
                        href={`#`}
                        onClick={handleEmailClick}
                        className={classNames(
                            "text-lg",
                            "sm:text-xl",
                            "md:text-xl",
                            "lg:text-xl"
                        )}
                        icon="mail-line"
                    >
                        Email
                    </ButtonLink>
                </Flex>
                <h3
                    className={classNames(
                        "font-light text-sm mt-3 text-shadow-lg text-white/40",
                        "sm:text-sm max-w-[150px]",
                        "md:text-xl max-w-[300px]",
                        "lg:text-xl max-w-[400px]"
                    )}
                >
                    <span className={classNames("text-xs font-bold ")}>
                        Proud to Serve:
                    </span>
                    <br /> Lenawee County, MI
                </h3>
            </Flex>
        </Flex>
    );
};
