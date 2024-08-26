"use-client";

import { Flex } from "../flex";
import { Logo } from "../logo";

interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    return (
        <footer className={className}>
            <Flex as="div" dir="row">
                <Logo />
                <Flex as="div">Lins</Flex>
                <Flex as="div">lins</Flex>
            </Flex>
        </footer>
    );
};
