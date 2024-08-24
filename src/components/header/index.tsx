"use client";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, Flex, Linker, Logo } from "../";
import "./style.scss";

export const Header = () => {
    const [stuck, setStuck] = useState<boolean>(false);

    const headerRef = useRef(null);
    const handleScroll = (
        el: HTMLElement | null,
        scrollY: number,
        headerHeight: number | undefined
    ) => {
        if (el && headerHeight) {
            if (headerHeight < scrollY) {
                if (!stuck) {
                    el.style.marginTop = "0";
                    el.classList.add(
                        "sfd-sticky",
                        "bg-sfdSecondary0/90",
                        "backdrop-blur-md"
                    );
                    setStuck(true);
                }
            } else {
                if (stuck) {
                    el.style.marginTop = `-${scrollY}px`;
                    el.classList.remove(
                        "sfd-sticky",
                        "bg-sfdSecondary0/90",
                        "backdrop-blur-md"
                    );

                    setStuck(false);
                }
            }
        }
    };

    useEffect(() => {
        let height: number | undefined = undefined;
        let el: HTMLElement | null = headerRef?.current;

        if (el) {
            el = el as HTMLElement;

            height = el.getBoundingClientRect().height;

            if (window.scrollY > height) {
                handleScroll(el, window.scrollY, height);
            }

            window.addEventListener("scroll", (e) =>
                handleScroll(el, window.scrollY, height)
            );
        }

        return () => {
            window.removeEventListener("scroll", (e) =>
                handleScroll(el, window.scrollY, height)
            );
        };
    }, [stuck]);

    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            ref={headerRef}
            className="sfd-header h-header fixed text-white"
            dir="row"
        >
            <Flex
                contain
                as="section"
                align={["items", "center"]}
                className="p-4 gap-x-28"
                dir="row"
            >
                <Flex as="div" className="">
                    <Logo />
                </Flex>
                <Flex
                    as="nav"
                    justify={["content", "end"]}
                    flex="auto"
                    dir="row"
                    className="gap-7"
                >
                    {/* <Linker href="/">Home</Linker>
                    <Linker href="/about">About</Linker> */}
                </Flex>
                <Flex as="div" justify={["items", "center"]}>
                    <ButtonLink
                        variant={stuck ? "border" : "fill"}
                        href="/contact"
                    >
                        Contact Us
                    </ButtonLink>
                </Flex>
            </Flex>
        </Flex>
    );
};
