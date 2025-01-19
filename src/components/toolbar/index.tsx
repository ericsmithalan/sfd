import clsx from "clsx";
import { FC } from "react";
import "./style.scss";

type ToolbarProps = {
    className?: string;
};

export const Toolbar: FC<ToolbarProps> = ({ className }) => {
    return <div className={clsx("toolbar", className)}></div>;
};
