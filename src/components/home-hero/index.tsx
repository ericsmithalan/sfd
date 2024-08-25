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
                    "lg:mt-20 lg:pl-20 lg:pr-20",
                    "md:mt-20 md:pl-20 md:pr-20",
                    "sm:mt-20",
                    "xsm:mt-20"
                )}
            >
                <h1
                    className={classNames(
                        "text-4xl leading-none font-extralight text-shadow-lg",
                        "sm:text-7xl md:max-w-[500px]"
                    )}
                >
                    Design<span className="font-extralight">. </span>
                    Build<span className="font-extralight">. </span>
                    <span className="text-sfdPrimary3">Inspire</span>
                    <span className="font-extralight">. </span>
                </h1>
                <h2
                    className={classNames(
                        "text-l mt-4 leading-relaxed font-light text-shadow-lg text-white/70",
                        "sm:max-w-[400px]"
                    )}
                >
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </h2>
                <Flex
                    as="div"
                    dir="row"
                    className={classNames(
                        "gap-8 mt-10 max-w-[180px] border-b-2 pb-4 border-dotted border-sfdPrimary2 text-xl",
                        "sm:max-w-[400px]",
                        "md:max-w-[400px]",
                        "lg:max-w-[400px]"
                    )}
                >
                    <ButtonLink
                        href={`#`}
                        onClick={handlePhoneClick}
                        icon="phone-line"
                        className={classNames("text-sm")}
                    >
                        Call
                    </ButtonLink>
                    <ButtonLink
                        href={`#`}
                        onClick={handleEmailClick}
                        className={classNames("text-sm")}
                        icon="mail-line"
                    >
                        Email
                    </ButtonLink>
                </Flex>
                <h3
                    className={classNames(
                        "font-light text-sm mt-4 max-w-[150px] text-shadow-lg text-white/70"
                    )}
                >
                    Proudly serving Lenawee County, MI
                </h3>
            </Flex>
        </Flex>
    );
};
