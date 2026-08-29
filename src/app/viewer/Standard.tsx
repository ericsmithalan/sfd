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
            <OutlinerProvider viewport={viewport}>
                <Region placement="left">
                    {!loading && (
                        <Outlet
                            context={{
                                viewport: viewport,
                                loading: loading,
                                isMobile: false,
                            }}
                        />
                    )}
                </Region>

                <Region placement="right">
                    {!loading && (
                        <>
                            <ModelPanel viewport={viewport} isMobile={false} loading={loading} />
                            <ObjectPanel viewport={viewport} isMobile={false} loading={loading} />
                        </>
                    )}
                </Region>
            </OutlinerProvider>

            <Region placement="top">
                <ModelProvider viewport={viewport}>
                    {!loading && (
                        <>
                            <Toolbar isMobile={false} viewport={viewport} />
                        </>
                    )}
                </ModelProvider>
            </Region>
        </>
    );
};
