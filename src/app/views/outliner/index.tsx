import clsx from "clsx";
import { useState } from "react";
import { Object3D } from "three";
import { Logo, OutlinerChild, Panel } from "../../../components";
import { projectOutlinerData } from "../../../data/outliner";
import { IOutlinerModel, IOutlinerProject } from "../../../interface";
import { Viewport } from "../../../lib";
import { setObjectVisibility } from "../../../utils";
import "./style.scss";

type OutlinerViewProps = {
    viewport: Viewport;
    object: Object3D | null;
    model: Object3D | null;
};

export const OutlinerView = ({
    viewport,
    object,
    model,
}: OutlinerViewProps) => {
    const [rootOutliner] =
        useState<Array<IOutlinerProject>>(projectOutlinerData);
    const [projectOutliner, setProjectOutliner] =
        useState<IOutlinerProject | null>(null);
    const [modelOutliner, setModelOutliner] = useState<IOutlinerModel | null>(
        null,
    );
    const [projectOpen, setProjectOpen] = useState<boolean>(true);
    const [modelOpen, setModelOpen] = useState<boolean>(true);

    return (
        <Panel>
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
                            open={projectOpen}
                            active={projectOutliner?.id === item.id}
                            href={`/viewer/${item.id}`}
                            name={item.name}
                            onClick={(e) => {
                                if (projectOutliner?.id === item.id) {
                                    setProjectOpen(!projectOpen);
                                } else {
                                    setProjectOutliner(item);
                                }
                            }}
                        >
                            {projectOutliner &&
                                projectOutliner.id === item.id &&
                                item.models.map((item2, n) => {
                                    return (
                                        <OutlinerChild
                                            key={`${item2.id}-${n}`}
                                            level={2}
                                            active={
                                                modelOutliner?.id === item2.id
                                            }
                                            name={item2.name}
                                            open={modelOpen}
                                            href={`/viewer/${item.id}/${item2.id}`}
                                            icon={"stack"}
                                            onClick={async (e) => {
                                                if (
                                                    modelOutliner?.id ===
                                                    item2.id
                                                ) {
                                                    setModelOpen(!modelOpen);
                                                } else {
                                                    viewport.clear();

                                                    const file =
                                                        await viewport.modelFile.load(
                                                            item2,
                                                        );
                                                    setModelOutliner(
                                                        file.userData.outliner,
                                                    );
                                                }
                                            }}
                                        >
                                            {modelOutliner &&
                                                modelOutliner.id === item2.id &&
                                                modelOutliner.children.map(
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
                                                                        viewport,
                                                                        item3.id,
                                                                        visible,
                                                                    );
                                                                    // viewport.clear();
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
