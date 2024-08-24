import Link from "next/link";
import { ButtonLink, Container, Flex, Logo } from "../shared";

export const Header = () => {
    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            className="h-header fixed bg-gray-700/70 backdrop-blur-md text-white"
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
                gap="9"
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
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                </Flex>
                <Flex as="div" flex="initial" justify={["items", "center"]}>
                    <ButtonLink>Contact Us</ButtonLink>
                </Flex>
            </Container>
        </Flex>
    );
};
