import { Fragment, useState } from "react";
import { NavLink, PanelDropdown, Scroller } from "../../../components";
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

export const NavPanel = ({ isMobile, outliner }: Props) => {
    const [obj, setObj] = useState<IOutliner | null>(null);

    return outliner.model ? (
        <PanelDropdown icon="apps" title="Projects" selected={outliner.model} isMobile={isMobile}>
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
        </PanelDropdown>
    ) : null;
};
