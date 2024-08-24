import { Flex, Title } from "../shared";

interface HomeHeroProps {}

export const HomeHero = ({}: HomeHeroProps) => {
    return (
        <Flex
            as="section"
            flex="auto"
            dir="col"
            className="bg-sfdSecondary1 md:bg-bg-home-hero lg:bg-bg-home-hero bg-cover w-screen h-[600px] text-white"
        >
            <div className="h-header"></div>
            <Flex
                as="div"
                dir="col"
                flex="auto"
                contain
                className="mt-20 pl-20"
            >
                <Title as="h1">
                    Design. Build.{" "}
                    <span className="text-sfdPrimary3"> Inspire</span>.
                </Title>
                <p className="text-2xl font-thin">
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </p>
            </Flex>
        </Flex>
    );
};
