import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type ScrollerProps = {
    children?: ReactNode;
    className?: string;
    width?: number | string;
    height?: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
};

export const Scroller: FC<ScrollerProps> = ({
    width,
    height = "100%",
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    className,
    children,
}) => {
    return (
        <div className={clsx("scroller", className)}>
            <div
                className={clsx("scroller-scroll")}
                style={{
                    width: width,
                    height: height,
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
