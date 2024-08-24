import classNames from "classnames";
import { FlexAttribures } from "../../../types";
import { flexPropsToCss } from "../../../utils/flex-props-to-css";

export interface FlexProps extends FlexAttribures {
    as: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Flex = ({ className, children, style, ...props }: FlexProps) => {
    return (
        <props.as
            style={style}
            className={classNames(
                props.inline ? "inline-flex" : "flex",
                flexPropsToCss(props),
                className
            )}
        >
            {children}
        </props.as>
    );
};
