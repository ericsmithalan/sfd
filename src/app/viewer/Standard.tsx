import { Outlet } from "react-router-dom";
import { Region } from "../../components";
import { ModelProvider, OutlinerProvider } from "../../context";
import { Viewport } from "../../lib";
import { ModelPanel } from "../panels/model";
import { ObjectPanel } from "../panels/object";
import { Toolbar } from "../toolbar";

type Props = {
    viewport: Viewport;
};

export const StandardViewer = ({ viewport }: Props) => {
    return (
        <>
            <Region placement="left">
                <OutlinerProvider isMobile={false} viewport={viewport}>
                    <Outlet />
                </OutlinerProvider>
            </Region>

            <Region placement="right">
                <OutlinerProvider isMobile={false} viewport={viewport}>
                    <ModelPanel />
                    <ObjectPanel />
                </OutlinerProvider>
            </Region>

            <Region placement="top">
                <ModelProvider isMobile={false} viewport={viewport}>
                    <Toolbar viewport={viewport} />
                </ModelProvider>
            </Region>
        </>
    );
};
