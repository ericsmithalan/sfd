import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type ToolbarProps = {
    className?: string;
    children?: ReactNode;
};

export const Toolbar: FC<ToolbarProps> = ({ className, children }) => {
    return <div className={clsx("toolbar", className)}>{children}</div>;
};
