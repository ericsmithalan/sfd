import { Outlet } from "react-router-dom";
import { Panel } from "../../../components";
import "./style.scss";

export const ModelView = () => {
    return (
        <>
            <Panel className="model-view">Model Panel</Panel>
            <Outlet />
        </>
    );
};
