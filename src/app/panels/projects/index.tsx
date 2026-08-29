import { Fragment, useEffect, useState } from "react";
import { NavLink, Panel, Scroller } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { Viewport } from "../../../lib";
import "./style.scss";

type ViewerState = {
    visible: boolean;
};

type Props = {
    viewport: Viewport;
    loading: boolean;
    isMobile: boolean;
    outliner: IOutlinerContext;
};

export const ProjectsPanel = ({ viewport, loading, isMobile, outliner }: Props) => {
    const [viewer, setViewer] = useState<ViewerState>({
        visible: false,
    });

    useEffect(() => {
        if (outliner.model) {
            setViewer({ visible: true });
        }
    }, [outliner.model]);

    return outliner.model ? (
        <Panel className="projects-panel" icon="shapes" title="Projects">
            <Scroller className="project-scroller">
                {outliner.models.map((item, i) => {
                    return (
                        <Fragment key={i}>
                            <NavLink
                                variant="outliner"
                                href={`/${String(item.parentName)}/${String(item.name)}`}
                                icon="armchair"
                                active={
                                    (outliner.model && outliner.model.id === item.id) || undefined
                                }
                                text={item.name}
                                onClick={(e) => {
                                    if (outliner.model && outliner.model.id === item.id) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Fragment>
                    );
                })}
            </Scroller>
        </Panel>
    ) : null;
};
