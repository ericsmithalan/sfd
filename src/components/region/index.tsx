import clsx from "clsx";
import { FC, ReactNode } from "react";
import "./style.scss";

type RegionProps = {
    placement: "left" | "right" | "top" | "bottom";
    children?: ReactNode;
};

export const Region: FC<RegionProps> = ({ placement, children }) => {
    return <div className={clsx("region", `place-${placement}`)}>{children}</div>;
};
