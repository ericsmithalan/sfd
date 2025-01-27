"use client";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Loading } from "../components";
import { IViewportEvent, Viewport } from "../lib";
import "./style.scss";
import { MobileViewer } from "./viewer/Mobile";
import { StandardViewer } from "./viewer/Standard";

export interface IOutletContenxt {
    viewport: Viewport;
}

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>();
    const [loading, setLoading] = useState(true);
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
        <div id="viewer-main" className="viewer">
            {loading && <Loading message="Loading" />}
            {viewport &&
                (isMobile ? (
                    <MobileViewer loading={loading} viewport={viewport} />
                ) : (
                    <StandardViewer loading={loading} viewport={viewport} />
                ))}

            <canvas className="canvas" ref={canvasRef} />
        </div>
    );
};
