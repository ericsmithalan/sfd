import { ReactNode } from "react";
import "./layout.scss";

export type AppLayoutProps = {
    children?: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    return <div className="model-layout">{children}</div>;
};

export default AppLayout;
