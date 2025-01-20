import { Outlet } from "react-router-dom";
import { Panel } from "../../../components";
import { useOutliner } from "../../../hooks";
import "./style.scss";

export const RootOutliner = () => {
    const outliner = useOutliner();
    console.log(outliner);
    return (
        <Panel>
            Root Outliner
            <Outlet />
        </Panel>
    );
};
