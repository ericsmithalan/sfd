import { Outlet } from "react-router-dom";
import { Panel } from "../../../components";
import "./style.scss";

export const RootOutliner = () => {
    return (
        <Panel>
            Root Outliner
            <Outlet />
        </Panel>
    );
};
