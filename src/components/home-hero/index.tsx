"use client";
import { useContactInfo } from "@/hooks";
import { ButtonLink, Flex, Title } from "../";

interface HomeHeroProps {}

export const HomeHero = ({}: HomeHeroProps) => {
    const { email, phone } = useContactInfo();

    return (
        <Flex
            as="section"
            flex="auto"
            dir="col"
            className="bg-sfdSecondary1 bg-home-hero-mobile md:bg-home-hero lg:bg-home-hero bg-cover bg-right-top sm:bg-right-bottom w-screen h-[600px] text-white"
        >
            <div className="h-header"></div>
            <Flex
                as="div"
                dir="col"
                flex="auto"
                contain
                className="mt-10 pl-10 pr-10 md:mt-20 lg:mt-20 md:pl-20 lg:pl-20 md:pr-20 lg:pr-20"
            >
                <Title
                    as="h1"
                    className="text-4xl leading-snug font-normal md:text-4xl lg:text-6xl"
                >
                    Design. Build.{" "}
                    <span className="text-sfdPrimary3"> Inspire</span>.
                </Title>
                <p className="text-xl leading-relaxed font-light max-w-[600px] mt-5 text-white/70">
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </p>

                <Flex as="div" dir="row" className="gap-4 mt-7 text-2xl">
                    <ButtonLink
                        href={`tel:${phone}`}
                        icon="phone-fill"
                        className="text-xl"
                    >
                        {phone}
                    </ButtonLink>
                    <ButtonLink href={`mailto:${email}`} icon="mail-fill">
                        Email
                    </ButtonLink>
                </Flex>
            </Flex>
        </Flex>
    );
};
