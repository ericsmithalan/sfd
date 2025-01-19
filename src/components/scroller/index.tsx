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
    disable?: boolean;
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
    disable = false,
}) => {
    return (
        <div className={clsx("scroller", disable && "disabled", className)}>
            <div
                className={clsx("scroller-scroll")}
                style={{
                    width: (!disable && width) || undefined,
                    height: (!disable && height) || undefined,
                    maxHeight: (!disable && maxHeight) || undefined,
                    maxWidth: (!disable && maxWidth) || undefined,
                    minHeight: (!disable && minHeight) || undefined,
                    minWidth: (!disable && minWidth) || undefined,
                }}
            >
                {children}
            </div>
        </div>
    );
};
