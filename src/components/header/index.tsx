"use client";
import { useEffect, useRef, useState } from "react";
import { ButtonLink, Flex, Linker, Logo } from "../";
import "./style.scss";
import classNames from "classnames";
import { Stick } from "next/font/google";
import { useContactInfo } from "@/hooks";

export const Header = () => {
    const [stuck, setStuck] = useState<boolean>(false);
    const { email, phone } = useContactInfo();

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
                        "bg-sfdGray2/90",
                        "backdrop-blur-md"
                    );
                    setStuck(true);
                }
            } else {
                if (stuck) {
                    el.style.marginTop = `-${scrollY}px`;
                    el.classList.remove(
                        "sfd-sticky",
                        "bg-sfdGray2/90",
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
                <Logo className={classNames("w-80 aspect-auto")} />

                <Flex
                    as="div"
                    full="w"
                    justify={["content", "end"]}
                    flex="auto"
                    className="gap-3"
                >
                    <ButtonLink
                        title="Call Me"
                        icon="phone-fill"
                        variant={"border"}
                        href={`tel:${phone}`}
                    />
                    <ButtonLink
                        title="Email Me"
                        icon="mail-fill"
                        variant={"border"}
                        href={`mailto:${email}`}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
