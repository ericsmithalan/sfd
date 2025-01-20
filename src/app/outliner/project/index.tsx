import { Outlet } from "react-router-dom";
import "./style.scss";

export const ProjectOutliner = () => {
    return (
        <div>
            Project Outliner
            <Outlet />
        </div>
    );
};
