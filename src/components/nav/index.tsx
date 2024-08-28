"use-client";

import classNames from "classnames";
import { Flex } from "../flex";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { ButtonLink } from "../button-link";
import { createPortal } from "react-dom";
import { NavMenu } from "./menu";
import { useState } from "react";

interface NavProps {
    className?: string;
}

export const Nav = ({ className }: NavProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const isDesktopOrLaptop = useMediaQuery({
        query: "(max-width: 768px)",
    });

    if (isDesktopOrLaptop) {
        console.log("is that");
    }

    return (
        <Flex
            as="nav"
            flex="auto"
            className={classNames(className, "items-center justify-end")}
        >
            <Flex as="div">
                <ButtonLink
                    href="#"
                    icon="menu"
                    className="text-3xl"
                    onClick={(e) => {
                        setIsMenuOpen(!isMenuOpen);
                    }}
                />
            </Flex>
            {createPortal(<NavMenu isOpen={isMenuOpen} />, document.body)}
            <Flex
                as="div"
                dir="row"
                flex="auto"
                className={classNames("gap-7 content-end")}
            >
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
            </Flex>
        </Flex>
    );
};
