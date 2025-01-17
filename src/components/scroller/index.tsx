import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type ScrollerProps = {
    children?: ReactNode;
    className?: string;
    maxHeight?: number;
};

export const Scroller: FC<ScrollerProps> = ({
    maxHeight,
    className,
    children,
}) => {
    return (
        <div className={clsx("scroller", className)}>
            <div className={clsx("scroll")} style={{ maxHeight: maxHeight }}>
                {children}
            </div>
        </div>
    );
};
