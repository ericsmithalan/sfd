import classNames from "classnames";
import { Flex } from "../flex";

interface ResponsiveImageProps {
    url: string;
    className?: string;
    position?:
        | "bottom"
        | "center"
        | "left"
        | "left-bottom"
        | "left-top"
        | "right"
        | "right-bottom"
        | "right-top"
        | "top";
    backgroundClassName?: string;
    title?: string;
    contain?: "cover" | "contain";
}

export const ResponsiveImage = ({
    url,
    className,
    position,
    backgroundClassName,
    title,
    contain,
}: ResponsiveImageProps) => {
    return (
        <Flex
            as="div"
            title={title}
            className={classNames(`relative`, className)}
        >
            <Flex
                as="div"
                className={classNames(
                    `bg-no-repeat absolute top-0 left-0 right-0 bottom-0`,
                    `bg-${contain || "cover"}`,
                    position ? `bg-${position}` : "bg-left-top",
                    backgroundClassName
                )}
                style={{
                    backgroundImage: `url('/images/${url}')`,
                }}
            />
        </Flex>
    );
};
