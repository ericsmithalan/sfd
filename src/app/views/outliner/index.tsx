import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Logo, OutlinerChild, Panel } from "../../../components";
import { getProject } from "../../../data/outliner";
import { useOutliner } from "../../../hooks";
import { setObjectVisibility } from "../../../utils";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();
    const [projectOpen, setProjectOpen] = useState<boolean>(true);
    const [modelOpen, setModelOpen] = useState<boolean>(true);
    const params = useParams();

    useEffect(() => {
        if (params) {
            if (params.projectId) {
                const project = getProject(params.projectId);
                outliner.setProject(project);
            }
        }
    }, [params, outliner]);

    return (
        <Panel>
            <div className={clsx("outliner-tree")}>
                <div className="logo-content">
                    <Logo height={45} />
                </div>

                {outliner.root.map((item, i) => {
                    return (
                        <OutlinerChild
                            key={`${item.id}-${i}`}
                            icon="folder"
                            level={1}
                            open={projectOpen}
                            active={outliner.project?.id === item.id}
                            href={`/viewer/${item.id}`}
                            name={item.name}
                            onClick={(e) => {
                                if (outliner.project?.id === item.id) {
                                    setProjectOpen(!projectOpen);
                                } else {
                                    outliner.setProject(item);
                                }
                            }}
                        >
                            {outliner.project &&
                                outliner.project.id === item.id &&
                                item.models.map((item2, n) => {
                                    return (
                                        <OutlinerChild
                                            key={`${item2.id}-${n}`}
                                            level={2}
                                            active={
                                                outliner.model?.id === item2.id
                                            }
                                            name={item2.name}
                                            open={modelOpen}
                                            href={`/viewer/${item.id}/${item2.id}`}
                                            icon={"stack"}
                                            onClick={async (e) => {
                                                if (
                                                    item2.id ===
                                                    outliner.model?.id
                                                ) {
                                                    setModelOpen(!modelOpen);
                                                } else {
                                                    setModelOpen(true);
                                                }
                                            }}
                                        >
                                            {outliner.model &&
                                                outliner.model.id ===
                                                    item2.id &&
                                                outliner.model.children.map(
                                                    (item3, h) => {
                                                        return (
                                                            <OutlinerChild
                                                                key={`${item3.id}-${h}`}
                                                                level={3}
                                                                name={
                                                                    item3.name
                                                                }
                                                                href={`/viewer/${item.id}/${item2.id}/${item3.id}`}
                                                                icon={"box"}
                                                                onToolClick={(
                                                                    tool,
                                                                    visible,
                                                                    e,
                                                                ) => {
                                                                    setObjectVisibility(
                                                                        outliner.viewport,
                                                                        item3.id,
                                                                        visible,
                                                                    );
                                                                }}
                                                            ></OutlinerChild>
                                                        );
                                                    },
                                                )}
                                        </OutlinerChild>
                                    );
                                })}
                        </OutlinerChild>
                    );
                })}
            </div>
        </Panel>
    );
};
