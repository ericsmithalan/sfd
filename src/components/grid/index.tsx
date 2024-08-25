import classNames from "classnames";
import { CSSProperties } from "react";

interface GridProps {
    children?: React.ReactNode;
    as: React.ElementType;
    className?: string;
    inline?: boolean;
    cols?: number | "none" | "subgrid";
    colSpan?: ["span" | "start" | "end", number | "full" | "auto"];
    rows?: number | "none" | "subgrid";
    rowSpan?: ["span" | "start" | "end", number | "full" | "auto"];
    flow?: "row" | "col" | "dense" | "row-dense" | "col-dense";
    autoCols?: "auto" | "min" | "max" | "fr";
    autoRows?: "auto" | "min" | "max" | "fr";
    full?: "w" | "h" | "both";
    screen?: "w" | "h" | "both";
    contain?: boolean;
    gap?: number | string;
    style?: CSSProperties;
    justify?: [
        "self" | "items" | "content",
        "start" | "center" | "end" | "between" | "around" | "stretch" | "evenly"
    ];
    align?: [
        "self" | "items" | "content",
        "start" | "center" | "end" | "between" | "around" | "stretch" | "evenly"
    ];
}

export const Grid = ({
    children,
    className,
    cols,
    rows,
    colSpan,
    rowSpan,
    flow,
    autoCols,
    autoRows,
    full,
    screen,
    contain,
    justify,
    align,
    gap,
    style,
    inline,
    ...props
}: GridProps) => {
    let justifyPrefix, alignPrefix;

    if (justify) {
        const jtype = justify[0];
        if (jtype === "content") {
            justifyPrefix = `justify-`;
        } else {
            justifyPrefix = `justify-${jtype}-`;
        }
    }

    if (align) {
        const atype = align[0];
        if (atype === "content") {
            alignPrefix = `justify-`;
        } else {
            alignPrefix = `justify-${atype}-`;
        }
    }

    return (
        <props.as
            style={style}
            className={classNames(
                inline ? "grid-inline" : "grid",
                cols && `grid-cols-${cols}`,
                colSpan && `col-${colSpan[0]}-${colSpan[1]}`,
                rows && `grid-rows-${rows}`,
                rowSpan && `col-${rowSpan[0]}-${rowSpan[1]}`,
                flow && `grid-flow-${flow}`,
                autoCols && `auto-cols-${autoCols}`,
                autoRows && `auto-rows-${autoRows}`,
                full === "both"
                    ? `w-full h-full`
                    : full === "w"
                    ? "w-full"
                    : "h-full",
                screen === "both"
                    ? `w-screen h-screen`
                    : screen === "w"
                    ? "w-screen"
                    : "h-screen",
                contain && `conainer`,
                justify && `${justifyPrefix}${justify}`,
                align && `${alignPrefix}${align}`,
                gap && `gap-${gap}`,
                className
            )}
        >
            {children}
        </props.as>
    );
};
