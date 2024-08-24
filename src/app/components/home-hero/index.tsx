import { Container, Flex, Title } from "..";

interface HomeHeroProps {}

export const HomeHero = ({}: HomeHeroProps) => {
    return (
        <Flex
            as="section"
            flex="auto"
            dir="col"
            full="w"
            className="bg-sfdSecondary1 h-full"
        >
            <Container as="div" dir="col" flex="auto" center={true}>
                <Title as="h1">Design. Build. Inspire.</Title>
                <p>
                    Experience the art of furniture design, tailored to your
                    unique vision.
                </p>
            </Container>
        </Flex>
    );
};
