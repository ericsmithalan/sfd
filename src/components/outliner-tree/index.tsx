import { IModelOutliner, IObjectOutliner, IRootOutliner } from "@/interface";
import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "../nav-link";
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
    console.log("model", model);
    return (
        <div className={clsx("outliner-tree")}>
            {rootOutliner.map((item, i) => {
                return (
                    <div key={i}>
                        <NavLink
                            variant="outliner"
                            active={project?.id === item.id}
                            href={`/${item.id}`}
                        >
                            {item.name}
                        </NavLink>

                        {project &&
                            project.id === item.id &&
                            item.models.map((item2, n) => {
                                return (
                                    <div key={i + n}>
                                        <NavLink
                                            variant="outliner"
                                            active={model?.id === item2.id}
                                            href={`/${item.id}/${item2.id}`}
                                        >
                                            {item2.name}
                                        </NavLink>

                                        {model &&
                                            model.id === item2.id &&
                                            model?.children.map((item3, l) => {
                                                return (
                                                    <div key={i + n + l}>
                                                        <NavLink
                                                            active={
                                                                object?.id ===
                                                                item3.id
                                                            }
                                                            variant="outliner"
                                                            href={`/${item.id}/${model.id}/${item3.id}`}
                                                        >
                                                            {item3.name}
                                                        </NavLink>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
};

//  model.children.map((child, h) => {
//                                 return (
//                                     <div key={i + h}>
//                                         <NavLink
//                                             active={object?.id === child.id}
//                                             variant="outliner"
//                                             href={`/${item.id}/${model.id}/${child.id}`}
//                                         >
//                                             {child.name}
//                                         </NavLink>
//                                     </div>
//                                 );
//                             })}
