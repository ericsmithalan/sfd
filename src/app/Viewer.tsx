"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Outlet } from "react-router-dom";
import { Loading, Region } from "../components";
import { ModelProvider, OutlinerProvider } from "../context";
import { IViewportEvent, Viewport } from "../lib";
import { ModelPanel } from "./panels/model";
import { ObjectPanel } from "./panels/object";
import "./style.scss";
import { Toolbar } from "./toolbar";

export interface IOutletContenxt {
    viewport: Viewport;
}

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>();
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let vp: Viewport;
        const loading = (e: IViewportEvent["loading"]) => {
            setLoading(e.value);
        };

        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current, isMobile);
                vp.addEventListener("loading", loading);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                vp.removeEventListener("loading", loading);
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <div className="viewer">
            {loading && <Loading message="Loading" />}
            {viewport && (
                <>
                    <Region className={clsx(isMobile && "mobile")} placement="left">
                        <OutlinerProvider isMobile={isMobile} viewport={viewport}>
                            <Outlet />
                        </OutlinerProvider>
                    </Region>
                    <Region className={clsx(isMobile && "mobile")} placement="right">
                        <OutlinerProvider isMobile={isMobile} viewport={viewport}>
                            <ModelPanel />
                            <ObjectPanel />
                        </OutlinerProvider>
                    </Region>

                    <Region className={clsx(isMobile && "mobile")} placement="top">
                        <ModelProvider isMobile={isMobile} viewport={viewport}>
                            <Toolbar
                                onLoading={(loading) => {
                                    setLoading(loading);
                                }}
                                viewport={viewport}
                            />
                        </ModelProvider>
                    </Region>
                </>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
