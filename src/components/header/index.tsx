"use client";
import { useEffect, useRef, useState } from "react";
import { ContactButtons, Flex, Logo } from "../";
import "./style.scss";
import classNames from "classnames";
import { Nav } from "../nav";

export const Header = () => {
    const [stuck, setStuck] = useState<boolean>(false);
    const headerRef = useRef(null);

    useEffect(() => {
        let height: number | undefined = undefined;
        let el: HTMLElement | null = headerRef?.current;

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

        if (el && window) {
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
            className={classNames("sfd-header h-header z-50 fixed text-white")}
            dir="row"
        >
            <Flex
                contain
                as="section"
                flex="auto"
                align={["items", "center"]}
                className={classNames("p-4 pl-8 pr-8")}
                dir="row"
            >
                <Logo className={classNames("w-96 aspect-auto")} />
                {/* <Nav /> */}
                <ContactButtons
                    variant="border"
                    iconOnly={true}
                    className="justify-end"
                />
            </Flex>
        </Flex>
    );
};
