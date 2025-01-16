import { Outlet } from "react-router-dom";
import "./style.scss";

export const ProjectView = () => {
    return (
        <div className="project">
            Project view
            <Outlet />
        </div>
    );
};
