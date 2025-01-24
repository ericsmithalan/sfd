import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Logo, Panel } from "../../components";
import { useOutliner } from "../../hooks";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel className={clsx("outliner-main", outliner.isMobile && "mobile")}>
            <Logo height={45} />
            <Outlet context={{ outliner: outliner }} />
        </Panel>
    );
};
