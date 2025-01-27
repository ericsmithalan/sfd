import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Region } from "../../components";
import { ModelProvider, OutlinerProvider } from "../../context";
import { Viewport } from "../../lib";
import { ImagesPanel } from "../panels/images";
import { Toolbar } from "../toolbar";

type Props = {
    viewport: Viewport;
};

export const MobileViewer = ({ viewport }: Props) => {
    return (
        <OutlinerProvider isMobile={true} viewport={viewport}>
            <Region className={clsx("mobile")} placement="left">
                <Outlet />
            </Region>

            <Region className={clsx("mobile")} placement="top">
                <ModelProvider isMobile={true} viewport={viewport}>
                    <Toolbar viewport={viewport}>
                        <ImagesPanel />
                    </Toolbar>
                </ModelProvider>
            </Region>
        </OutlinerProvider>
    );
};
