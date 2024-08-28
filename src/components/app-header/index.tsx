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
            className={classNames(
                "text-white bg-sfdGray1 shadow-lg z-50 fixed",
                className
            )}
            dir="row"
        >
            <Flex
                contain
                as="section"
                align={["items", "center"]}
                justify={["content", "start"]}
                className={classNames("p-4 pl-5 pr-5 gap-4")}
                dir="row"
            >
                <Logo
                    className={classNames("")}
                    imageClassName={classNames("w-36")}
                />
                <Flex
                    as="h3"
                    className={classNames(
                        "border-r-2 pr-4 text-lg border-white/10",
                        "lg:text-2xl"
                    )}
                >
                    {title}
                </Flex>
                <ButtonLink
                    title="Close Model Viewer"
                    className={classNames("p-0")}
                    href="/"
                    icon="close"
                ></ButtonLink>
            </Flex>
        </Flex>
    );
};
