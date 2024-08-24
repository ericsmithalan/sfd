import classNames from "classnames";
import { ReactNode } from "react";
import { Container } from "../container";
import { Flex } from "../flex";

interface PageProps {
    children?: ReactNode;
    hero?: ReactNode;
    className?: string;
}

export const Page = ({ children, className, hero }: PageProps) => {
    return (
        <Flex as="div" dir="col" className={classNames("", className)}>
            {hero && (
                <Flex dir="col" full="w" flex="auto" as="section" className="">
                    {hero}
                </Flex>
            )}
            <Container
                flex="auto"
                className="bg-red-400"
                full="both"
                center={true}
                as="section"
            >
                {children}
            </Container>
        </Flex>
    );
};
