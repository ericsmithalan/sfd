import classNames from "classnames";
import { ReactNode } from "react";
import { Flex, FlexProps } from "../flex";
import Head from "next/head";

interface PageLayoutProps extends FlexProps {
    children?: ReactNode;
    hero?: ReactNode;
    className?: string;
    description?: string;
}

export const PageLayout = ({ children, className, hero }: PageLayoutProps) => {
    return (
        <>
            <Flex as="div" dir="col" className={classNames("h-fit", className)}>
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
                <Flex
                    flex="1"
                    dir="col"
                    as="section"
                    contain
                    className={classNames("pb-11")}
                >
                    {children}
                </Flex>
            </Flex>
        </>
    );
};
