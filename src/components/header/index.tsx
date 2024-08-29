"use client";
import { useEffect, useRef, useState } from "react";
import { ContactButtons, Flex, Logo } from "../";
import classNames from "classnames";
import "./style.scss";

interface HeaderProps {
    className?: string;
    fixed?: boolean;
}

export const Header = ({ fixed, className }: HeaderProps) => {
    const [stuck, setStuck] = useState<boolean>(false);
    const headerRef = useRef(null);

    useEffect(() => {
        let height: number | undefined = undefined;
        let el: HTMLElement | null = headerRef?.current;

        if (fixed) {
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
        }
    }, [stuck, fixed]);

    return (
        <Flex
            as="header"
            flex="auto"
            full="w"
            ref={headerRef}
            className={classNames(
                "sfd-header h-header z-50 text-white",
                fixed ? "fixed" : "",
                className
            )}
            dir="row"
        >
            <Flex
                contain
                as="section"
                flex="auto"
                align={["items", "center"]}
                className={classNames("p-4 pl-4 pr-4 gap-2")}
                dir="row"
            >
                <Logo
                    className={classNames("w-44", "lg:48")}
                    imageClassName={classNames("w-44")}
                />
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
