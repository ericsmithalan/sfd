import { ReactNode } from "react";
import { ViewerLayoutClient } from "./layout.client";
import "./layout.scss";
export type AppLayoutProps = {
    children?: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="models-layout">
            <ViewerLayoutClient>{children}</ViewerLayoutClient>
        </div>
    );
};

export default AppLayout;
