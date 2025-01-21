import clsx from "clsx";
import { FC, Fragment } from "react";
import { IStat } from "../../interface";
import "./style.scss";

type StatsProps = {
    stats: Array<IStat>;
    className?: string;
};

export const Stats: FC<StatsProps> = ({ className, stats }) => {
    return (
        <div className={clsx("stats", className)}>
            {stats.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <div className="col-1">{item.name}</div>
                        <div className="col-2">
                            {item.value} {item.unit && <span className="unit">{item.unit}</span>}
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};
