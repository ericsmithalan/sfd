import { Outlet } from "react-router-dom";
import { Panel } from "../../components";
import { useOutliner } from "../../hooks";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel title="Projects" icon="gallery-view-2">

            <Outlet context={{ outliner: outliner }} />
        </Panel>
    );
};


