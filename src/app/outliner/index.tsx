import { Outlet, useOutletContext } from "react-router-dom";
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
        <Outlet
            context={{
                outliner: outliner,
                viewport: viewport,
                isMobile: isMobile,
                loading: loading,
            }}
        />
    );
};
