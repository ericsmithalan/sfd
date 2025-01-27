import clsx from "clsx";
import { Outlet } from "react-router-dom";
import { Region } from "../../components";
import { ModelProvider, OutlinerProvider } from "../../context";
import { Viewport } from "../../lib";
import { ImagesPanel } from "../panels/images";
import { Toolbar } from "../toolbar";

type Props = {
    viewport: Viewport;
    loading: boolean;
};

export const MobileViewer = ({ viewport, loading }: Props) => {
    return (
        <OutlinerProvider isMobile={true} viewport={viewport}>
            <Region className={clsx("mobile", loading && "loading")} placement="left">
                <Outlet context={{ viewport: viewport, loading: loading }} />
            </Region>

            <Region className={clsx("mobile", loading && "loading")} placement="top">
                <ModelProvider isMobile={true} viewport={viewport}>
                    <Toolbar viewport={viewport}>
                        <ImagesPanel viewport={viewport} loading={loading} />
                    </Toolbar>
                </ModelProvider>
            </Region>
        </OutlinerProvider>
    );
};
