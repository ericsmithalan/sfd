"use client";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, ContactButtons, Flex, Logo } from "../";
import classNames from "classnames";
import "./style.scss";
import Link from "next/link";

interface AppHeaderProps {
    className?: string;
    title?: string;
}

export const AppHeader = ({ className, title }: AppHeaderProps) => {
    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            className={classNames("text-white z-50 fixed", className)}
            dir="row"
        >
            <Flex
                contain
                as="section"
                align={["items", "center"]}
                justify={["content", "center"]}
                className={classNames("p-4 pl-8 pr-8 gap-4")}
                dir="row"
            >
                <Logo className={classNames("w-36 aspect-auto")} />
                <Flex
                    as="h3"
                    flex="auto"
                    className={classNames(
                        "border-l-2 pl-4 text-2xl border-sfdPrimary2"
                    )}
                >
                    {title}
                </Flex>
                <ButtonLink variant="border" href="/" icon="close"></ButtonLink>
            </Flex>
        </Flex>
    );
};
