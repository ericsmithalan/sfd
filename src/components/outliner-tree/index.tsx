import { IModelOutliner, IObjectOutliner, IRootOutliner } from "@/interface";
import clsx from "clsx";
import { FC } from "react";
import { Logo } from "../logo";
import { OutlinerChild } from "./child";
import "./style.scss";

type OutlinerTreeProps = {
    rootOutliner: Array<IRootOutliner>;
    project: IRootOutliner | null;
    model: IModelOutliner | null;
    object: IObjectOutliner | null;
};

export const OutlinerTree: FC<OutlinerTreeProps> = ({
    rootOutliner,
    project,
    model,
    object,
}) => {
    return (
        <div className={clsx("outliner-tree")}>
            <div className="logo-content">
                <Logo height={50} />
            </div>
            {rootOutliner.map((item, i) => {
                return (
                    <OutlinerChild
                        key={`${item.id}-${i}`}
                        icon="folder"
                        level={1}
                        active={project?.id === item.id}
                        href={`/${item.id}`}
                        name={item.name}
                    >
                        {project &&
                            project.id === item.id &&
                            item.models.map((item2, n) => {
                                return (
                                    <OutlinerChild
                                        key={`${item2.id}-${n}`}
                                        level={2}
                                        active={model?.id === item2.id}
                                        name={item2.name}
                                        href={`/${item.id}/${item2.id}`}
                                        icon={"stack"}
                                    >
                                        {model &&
                                            model.id === item2.id &&
                                            model.children.map((item3, h) => {
                                                return (
                                                    <OutlinerChild
                                                        key={`${item3.id}-${h}`}
                                                        level={3}
                                                        active={
                                                            object?.id ===
                                                            item3.id
                                                        }
                                                        name={item3.name}
                                                        href={`/${item.id}/${model.id}/${item3.id}`}
                                                        icon={item3.icon}
                                                    />
                                                );
                                            })}
                                    </OutlinerChild>
                                );
                            })}
                    </OutlinerChild>
                );
            })}
        </div>
    );
};
