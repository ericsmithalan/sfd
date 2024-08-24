import classNames from "classnames";
import { FlexAttribures } from "../../../types";
import { flexPropsToCss } from "../../../utils/flex-props-to-css";
import { forwardRef, Ref } from "react";

export interface FlexProps extends FlexAttribures {
    as: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    ref?: Ref<unknown>;
}

export const Flex = forwardRef(
    (
        { className, children, style, ...props }: FlexProps,
        ref: Ref<unknown>
    ) => {
        return (
            <props.as
                style={style}
                ref={ref}
                className={classNames(
                    props.inline ? "inline-flex" : "flex",
                    flexPropsToCss(props),
                    className
                )}
            >
                {children}
            </props.as>
        );
    }
);

// export const FlexRef = forwardRef(
//     (
//         { as, className, style, children, ...props }: FlexProps,
//         ref: Ref<unknown>
//     ) => {
//         return <Flex as={as} {...props} ref={ref} />;
//     }
// );
