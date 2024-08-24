import classNames from "classnames";
import { Flex, FlexProps } from "../..";
import { FlexAttribures } from "../../../types";
import { flexPropsToCss } from "../../../utils/flex-props-to-css";

interface ContainerProps extends FlexAttribures {
    as: React.ElementType;
    children?: React.ReactNode;
    className?: string;
    center?: boolean;
}

export const Container = ({
    as,
    children,
    className,
    center,
    ...props
}: ContainerProps) => {
    return (
        <Flex
            className={classNames(
                "container",
                center && "mx-auto",
                flexPropsToCss(props as FlexProps),
                className
            )}
            as={as}
        >
            {children}
        </Flex>
    );
};
