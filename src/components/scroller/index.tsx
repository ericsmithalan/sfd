import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type ScrollerProps = {
    children?: ReactNode;
    className?: string;
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
};

export const Scroller: FC<ScrollerProps> = ({
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    className,
    children,
}) => {
    return (
        <div className={clsx("scrollable", className)}>
            <div
                className={clsx("scroll")}
                style={{
                    maxHeight: maxHeight,
                    maxWidth: maxWidth,
                    minHeight: minHeight,
                    minWidth: minWidth,
                }}
            >
                {children}
            </div>
        </div>
    );
};
