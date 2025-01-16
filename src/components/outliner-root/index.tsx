import clsx from "clsx";
import { FC } from "react";
import { IconName } from "../../types";
import "./style.scss";
import { IRootOutliner } from "@/interface";

type OutlinerRootProps = {
    data: Array<IRootOutliner>;
};

export const OutlinerRoot: FC<OutlinerRootProps> = ({ data }) => {
    return (
        <div className={clsx("outliner-root")}>
            {data.map((item, i) => {
                return <div key={i}>{item.name}</div>;
            })}
        </div>
    );
};
