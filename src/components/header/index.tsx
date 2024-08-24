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
            className="sfd-header h-header z-30 fixed text-white"
            dir="row"
        >
            <Flex
                contain
                as="section"
                flex="auto"
                align={["items", "center"]}
                className="p-4 gap-2 md:gap-x-28 lg:gap-x-28"
                dir="row"
            >
                <Flex as="div" className="">
                    <Logo className="w-44 lg:w-64 md:w-44 sm:w-44 xsm:w-44" />
                </Flex>

                <Flex
                    as="div"
                    full="w"
                    justify={["content", "end"]}
                    flex="auto"
                >
                    <ButtonLink variant={"border"} href="/contact">
                        Contact Us
                    </ButtonLink>
                </Flex>
            </Flex>
        </Flex>
    );
};
