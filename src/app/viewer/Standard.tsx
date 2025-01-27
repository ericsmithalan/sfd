import { Outlet } from "react-router-dom";
import { Region } from "../../components";
import { ModelProvider, OutlinerProvider } from "../../context";
import { Viewport } from "../../lib";
import { ModelPanel } from "../panels/model";
import { ObjectPanel } from "../panels/object";
import { Toolbar } from "../toolbar";

type Props = {
    viewport: Viewport;
    loading: boolean;
};

export const StandardViewer = ({ viewport, loading }: Props) => {
    return (
        <>
            <OutlinerProvider isMobile={false} viewport={viewport}>
                <Region placement="left">
                    <Outlet context={{ viewport: viewport, loading: loading }} />
                </Region>

                <Region placement="right">
                    <ModelPanel viewport={viewport} loading={loading} />
                    <ObjectPanel viewport={viewport} loading={loading} />
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
