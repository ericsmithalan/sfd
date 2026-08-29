import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { NavLink, Panel, Scroller } from "../../../components";
import { IOutlinerContext } from "../../../context";
import { IOutliner } from "../../../interface";
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
    const [obj, setObj] = useState<IOutliner | null>(null);

    useEffect(() => {
        if (outliner.category?.id) {
            if (!obj) {
                setObj(outliner.category);
            }
        }
    }, [obj, outliner.category]);

    return outliner.model ? (
        <Panel
            className={clsx("projects-panel", isMobile && "mobile")}
            icon="shapes"
            title="Projects"
        >
            <Scroller className="project-scroller" scrollTo={`cat_${obj?.id}`}>
                {outliner.models.map((item, i) => {
                    return (
                        <Fragment key={i}>
                            <NavLink
                                id={`cat_${obj?.id}`}
                                variant="outliner"
                                href={`/${String(item.parentName)}/${String(item.name)}`}
                                icon="armchair"
                                active={obj?.id === item.id}
                                text={item.name}
                                onClick={(e) => {
                                    setObj(item);
                                    if (obj?.id === item.id) {
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
