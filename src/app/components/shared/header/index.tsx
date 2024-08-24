import Link from "next/link";
import { ButtonLink, Container, Flex, Linker, Logo } from "..";

export const Header = () => {
    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            className="h-header bg-gray-700/70 backdrop-blur-md text-white"
            dir="row"
        >
            <Container
                center
                as="section"
                flex="auto"
                full="w"
                align={["items", "center"]}
                className="p-4"
                dir="row"
            >
                <Flex as="div" flex="initial" className="">
                    <Logo width={200} />
                </Flex>
                <Flex
                    as="nav"
                    flex="auto"
                    justify={["content", "end"]}
                    grow={true}
                    className=""
                    dir="row"
                >
                    <Linker href="/">Home</Linker>
                    <Linker href="/about">About</Linker>
                </Flex>
                <Flex as="div" flex="initial" justify={["items", "center"]}>
                    <ButtonLink href="/contact">Contact Us</ButtonLink>
                </Flex>
            </Container>
        </Flex>
    );
};
