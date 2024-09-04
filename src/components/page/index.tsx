import classNames from "classnames";
import { ReactNode } from "react";
import { Flex, FlexProps } from "../flex";

interface PageLayoutProps extends FlexProps {
    children?: ReactNode;
    hero?: ReactNode;
    className?: string;
    description?: string;
}

export const PageLayout = ({ children, className, hero }: PageLayoutProps) => {
    return (
        <>
            <Flex as="div" dir="col" className={classNames(className)}>
                {hero && (
                    <Flex dir="col" full="w" flex="auto" as="section">
                        {hero}
                    </Flex>
                )}
                <Flex
                    flex="auto"
                    dir="col"
                    as="section"
                    full="both"
                    className={classNames("gap-16 pb-20")}
                >
                    {children}
                </Flex>
            </Flex>
        </>
    );
};
