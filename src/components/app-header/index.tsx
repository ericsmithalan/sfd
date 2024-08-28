"use client";
import { useEffect, useRef, useState } from "react";
import { ContactButtons, Flex, Logo } from "../";
import classNames from "classnames";
import "./style.scss";

interface AppHeaderProps {
    className?: string;
}

export const AppHeader = ({ className }: AppHeaderProps) => {
    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            className={classNames("text-white fixed", className)}
            dir="row"
        >
            <Flex
                contain
                as="section"
                flex="auto"
                align={["items", "center"]}
                justify={["content", "center"]}
                className={classNames("p-4 pl-8 pr-8")}
                dir="row"
            >
                <Logo className={classNames("w-36 aspect-auto")} />
            </Flex>
        </Flex>
    );
};
