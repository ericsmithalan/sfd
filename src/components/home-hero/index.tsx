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
                        "text-5xl leading-tight font-light text-shadow-lg",
                        "sm:text-7xl",
                        "md:text-7xl",
                        "lg:text-7xl"
                    )}
                >
                    Design<span className="font-extralight">. </span>
                    Build<span className="font-extralight">. </span>
                    <br />
                    <span className="text-sfdPrimary3">Inspire</span>
                    <span className="font-extralight">. </span>
                </h1>
                <h2
                    className={classNames(
                        "text-lg w-[300px] leading-relaxed mt-6 font-light text-shadow-lg text-white/70",
                        "sm:w-[350px] sm:text-xl",
                        "md:w-[500px] md:text-2xl",
                        "lg:w-[500px] md:text-2xl"
                    )}
                >
                    Bringing Your Ideas to Life with Expert Woodworking
                    Craftsmanship and Personalized 3D Design
                </h2>
                <Flex
                    as="div"
                    dir="row"
                    className={classNames(
                        "gap-8 mt-10 max-w-[200px] border-b-2 pb-4 border-dotted border-sfdPrimary2 text-xl",
                        "sm:max-w-[350px] sm:gap-14",
                        "md:max-w-[250px] md:gap-14",
                        "lg:max-w-[250px] lg:gap-14"
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
                        "font-light text-xs mt-3 text-shadow-lg text-white/40",
                        "sm:text-sm",
                        "md:text-xl",
                        "lg:text-xl"
                    )}
                >
                    <span className={classNames("")}>
                        Proud to Serve Lenawee County, MI
                    </span>
                </h3>
            </Flex>
        </Flex>
    );
};
