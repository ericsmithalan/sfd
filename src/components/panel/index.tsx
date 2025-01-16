import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type PanelProps = {
    className?: string;
    children?: ReactNode;
};

export const Panel: FC<PanelProps> = ({ className, children }) => {
    return <div className={clsx("panel", className)}>{children}</div>;
};
