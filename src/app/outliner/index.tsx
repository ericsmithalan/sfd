import clsx from "clsx";
import { Outlet, useOutletContext } from "react-router-dom";
import { Logo, Panel, Scroller } from "../../components";
import { useOutliner } from "../../hooks";
import { Viewport } from "../../lib";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();
    const { viewport, loading, isMobile } = useOutletContext<{
        viewport: Viewport;
        loading: boolean;
        isMobile: boolean;
    }>();

    return (
        <Panel className={clsx("outliner-main", isMobile && "mobile", outliner.model && "model")}>
            <Logo height={45} />
            <Scroller>
                <Outlet
                    context={{
                        outliner: outliner,
                        viewport: viewport,
                        isMobile: isMobile,
                        loading: loading,
                    }}
                />
            </Scroller>
        </Panel>
    );
};
