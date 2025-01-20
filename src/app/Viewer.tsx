"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Loading, Region } from "../components";
import { ModelProvider, OutlinerProvider } from "../context";
import { IViewportEvent, Viewport } from "../lib";
import { ProjectPanel } from "./panels/project";
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
                vp = new Viewport(canvasRef.current);
                vp.addEventListener("loading", loading);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                console.log("disposed viewport");
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
                    <Region placement="left">
                        <OutlinerProvider viewport={viewport}>
                            <Outlet />
                        </OutlinerProvider>
                    </Region>
                    <Region placement="top">
                        <Toolbar viewport={viewport} />
                    </Region>
                    <Region placement="right">
                        <ModelProvider viewport={viewport}>
                            <ProjectPanel />
                        </ModelProvider>
                    </Region>
                </>
            )}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
