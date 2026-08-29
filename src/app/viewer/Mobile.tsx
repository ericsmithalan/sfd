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
        <OutlinerProvider viewport={viewport}>
            <Outlet context={{ viewport: viewport, loading: loading, isMobile: true }} />

            <Region className={clsx("mobile", loading && "loading")} placement="top">
                <ModelProvider viewport={viewport}>
                    {!loading && (
                        <Toolbar isMobile={true} viewport={viewport}>
                            <ImagesPanel isMobile={true} viewport={viewport} loading={loading} />
                        </Toolbar>
                    )}
                </ModelProvider>
            </Region>
        </OutlinerProvider>
    );
};
