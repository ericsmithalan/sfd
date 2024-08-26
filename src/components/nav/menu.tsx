import classNames from "classnames";
import { Flex } from "../flex";
import { useState } from "react";

interface NavMenuProps {
    isOpen: boolean;
}

export const NavMenu = ({ isOpen }: NavMenuProps) => {
    return (
        <Flex
            as="div"
            className={classNames(
                "absolute top-[100px] left-0 z-50",
                "bg-white",
                isOpen ? "visible" : "hidden"
            )}
        >
            My Menu
        </Flex>
    );
};
