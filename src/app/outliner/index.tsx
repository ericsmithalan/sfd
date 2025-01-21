import { Outlet } from "react-router-dom";
import { Logo, Panel } from "../../components";
import { useOutliner } from "../../hooks";
import "./style.scss";

export const OutlinerView = () => {
    const outliner = useOutliner();

    return (
        <Panel contentCss="outliner-base">
            <Logo height={40} />
            <Outlet context={{ outliner: outliner }} />
        </Panel>
    );
};
