import clsx from "clsx";
import { FC, ReactNode } from "react";
import { IconName } from "../../types";
import "./style.scss";
import { IRootOutliner } from "@/interface";

type RegionProps = {
    placement: "left" | "right";
    children?: ReactNode;
};

export const Region: FC<RegionProps> = ({ placement, children }) => {
    return <div className={clsx("region", placement)}>{children}</div>;
};
