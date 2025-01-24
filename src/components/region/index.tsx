import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type RegionProps = {
    className?: string;
    placement: "left" | "right" | "top" | "bottom";
    children?: ReactNode;
};

export const Region: FC<RegionProps> = ({ placement, children, className }) => {
    return <div className={clsx("region", `place-${placement}`, className)}>{children}</div>;
};
