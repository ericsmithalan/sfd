import { Outlet, useOutletContext } from "react-router-dom";
import { useOutliner } from "../../hooks";
import { Viewport } from "../../lib";
import { NavPanel } from "../panels/nav";
import { PartsPanel } from "../panels/parts";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();
    const { viewport, loading, isMobile } = useOutletContext<{
        viewport: Viewport;
        loading: boolean;
        isMobile: boolean;
    }>();

    return (
        <>
            <NavPanel
                viewport={viewport}
                isMobile={isMobile}
                loading={loading}
                outliner={outliner}
            />
            {!isMobile && (
                <PartsPanel
                    viewport={viewport}
                    isMobile={isMobile}
                    loading={loading}
                    outliner={outliner}
                />
            )}

            <Outlet
                context={{
                    outliner: outliner,
                    viewport: viewport,
                    isMobile: isMobile,
                    loading: loading,
                }}
            ></Outlet>
        </>
    );
};
