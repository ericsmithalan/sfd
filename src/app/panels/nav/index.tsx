import clsx from "clsx";
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

export const NavPanel = ({ viewport, loading, isMobile, outliner }: Props) => {
    const [SelectedId, setSelectedId] = useState<number>(0);

    useEffect(() => {
        if (outliner.category?.id) {
            if (SelectedId === 0) {
                setSelectedId(outliner.category.id);
            }
        }
    }, [SelectedId, outliner.category]);

    return outliner.model && SelectedId !== 0 ? (
        <Panel
            className={clsx("projects-panel", isMobile && "mobile")}
            icon="shapes"
            title="Projects"
        >
            <Scroller className="project-scroller" scrollTo={`cat_${SelectedId}`}>
                {outliner.models.map((item, i) => {
                    return (
                        <Fragment key={i}>
                            <NavLink
                                id={`cat_${SelectedId}`}
                                variant="outliner"
                                href={`/${String(item.parentName)}/${String(item.name)}`}
                                icon="armchair"
                                active={
                                    (outliner.model && outliner.model.id === item.id) || undefined
                                }
                                text={item.name}
                                onClick={(e) => {
                                    setSelectedId(item.id);
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
