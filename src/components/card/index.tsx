import classNames from "classnames";
import { Flex } from "../flex";

interface CardProps {
    className?: string;
    dir?: "row" | "col";
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Card = ({ className, children, style, dir }: CardProps) => {
    return (
        <Flex
            as="div"
            dir={dir}
            flex="auto"
            align={["items", "center"]}
            style={style}
            className={classNames(
                "bg-white shadow-md text-center rounded-md p-8",
                className
            )}
        >
            {children}
        </Flex>
    );
};
