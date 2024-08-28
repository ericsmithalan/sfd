import classNames from "classnames";
import { FlexAttribures } from "../../types";
import { flexPropsToCss } from "../../utils/flex-props-to-css";
import { Ref } from "react";
import React from "react";

export interface FlexProps extends FlexAttribures {
    as: React.ElementType;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    ref?: Ref<unknown>;
    id?: string;
}

export const Flex = React.forwardRef(
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

Flex.displayName = "Flex";
