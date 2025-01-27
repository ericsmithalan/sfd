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
            <OutlinerProvider isMobile={false} viewport={viewport}>
                <Region placement="left">
                    <Outlet />
                </Region>

                <Region placement="right">
                    <ModelPanel />
                    <ObjectPanel />
                </Region>
            </OutlinerProvider>

            <Region placement="top">
                <ModelProvider isMobile={false} viewport={viewport}>
                    <Toolbar viewport={viewport} />
                </ModelProvider>
            </Region>
        </>
    );
};
