import clsx from "clsx";
import { Logo, OutlinerChild, Panel } from "../../../components";
import { useOutliner } from "../../../hooks";
import { setObjectVisibility } from "../../../utils";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

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
                            active={outliner.project?.id === item.id}
                            href={`/${item.id}`}
                            name={item.name}
                            onClick={() => {
                                outliner.setProject(item);
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
                                            href={`/${item.id}/${item2.id}`}
                                            icon={"stack"}
                                            onClick={(e) => {
                                                outliner.setModel(item2);
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
                                                                href={`/${item.id}/${item2.id}/${item3.id}`}
                                                                icon={"box"}
                                                                onClick={() => {
                                                                    outliner.setObject(
                                                                        item3,
                                                                    );
                                                                }}
                                                                onToolClick={(
                                                                    tool,
                                                                    visible,
                                                                    e,
                                                                ) => {
                                                                    console.log(
                                                                        "clicked",
                                                                    );
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
