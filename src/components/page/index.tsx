import classNames from "classnames";
import { ReactNode } from "react";
import { Flex, FlexProps } from "../flex";
import Head from "next/head";

interface PageLayoutProps extends FlexProps {
    children?: ReactNode;
    hero?: ReactNode;
    title: string;
    className?: string;
    description?: string;
}

export const PageLayout = ({
    children,
    className,
    hero,
    title,
}: PageLayoutProps) => {
    return (
        <>
            <Flex as="div" dir="col" className={classNames("", className)}>
                {hero && (
                    <Flex
                        dir="col"
                        full="w"
                        flex="auto"
                        as="section"
                        className=""
                    >
                        {hero}
                    </Flex>
                )}
                <Flex flex="auto" full="both" as="section" contain>
                    {children}
                </Flex>
            </Flex>
        </>
    );
};
