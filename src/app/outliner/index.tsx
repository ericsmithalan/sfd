import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Logo, Panel, Scroller } from "../../components";
import { useOutliner } from "../../hooks";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel
            className={clsx(
                "outliner-main",
                outliner.isMobile && "mobile",
                outliner.model && "model",
            )}
        >
            <Logo height={45} />
            <Scroller>
                <Outlet context={{ outliner: outliner }} />
            </Scroller>
        </Panel>
    );
};
