import { Outlet } from "react-router-dom";
import "./style.scss";

export const ModelView = () => {
    return (
        <div className="model-view">
            Model view <Outlet />
        </div>
    );
};
