"use client";
import { useContactInfo } from "@/hooks";
import { ButtonLink, Flex, Title } from "../";
import classNames from "classnames";

interface HomeHeroProps {}

export const HomeHero = ({}: HomeHeroProps) => {
    const { email, phone } = useContactInfo();

    return (
        <Flex
            as="section"
            flex="auto"
            dir="col"
            className={classNames(
                "bg-home-hero-mobile bg-sfdSecondary1 bg-cover bg-right-bottom",
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
                    "mt-14 pl-10 pr-10",
                    "lg:mt-20 lg:pl-20 lg:pr-20",
                    "md:mt-20 md:pl-20 md:pr-20",
                    "sm:mt-20",
                    "xsm:mt-20"
                )}
            >
                <h1
                    className={classNames(
                        "text-5xl leading-none font-normal text-shadow-lg",
                        "lg:text-7xl",
                        "md:text-7xl"
                    )}
                >
                    Design<span className="font-extralight">. </span>
                    Build<span className="font-extralight">. </span>
                    <span className="text-sfdPrimary3">Inspire</span>
                    <span className="font-extralight">. </span>
                </h1>
                <h2
                    className={classNames(
                        "text-2xl mt-7 leading-tight font-light text-shadow-lg text-white/70",
                        "lg:max-w-[800px]",
                        "md:max-w-[600px]",
                        "sm:max-w-[500px]"
                    )}
                >
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </h2>
                <Flex
                    as="div"
                    dir="row"
                    className={classNames(
                        "text-shadow-lg gap-4 mt-16 border-b-2 pb-4 border-dotted border-sfdPrimary2 text-2xl"
                    )}
                >
                    <ButtonLink
                        href={`tel:${phone}`}
                        icon="phone-line"
                        className="text-xl"
                    >
                        Call
                    </ButtonLink>
                    <ButtonLink href={`mailto:${email}`} icon="mail-line">
                        Email
                    </ButtonLink>
                </Flex>
                <h3
                    className={classNames(
                        "font-light mt-4 text-shadow-lg text-white/70"
                    )}
                >
                    Proudly serving Lenawee County, MI
                </h3>
            </Flex>
        </Flex>
    );
};
