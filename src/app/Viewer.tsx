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
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let vp: Viewport;
        const loading = (e: IViewportEvent["loading"]) => {
            setLoading(e.value);
        };

        if (canvasRef.current && containerRef.current) {
            vp = new Viewport(canvasRef.current, containerRef.current, isMobile);
            vp.addEventListener("loading", loading);
            setViewport(vp);
        }

        return () => {
            if (vp) {
                vp.removeEventListener("loading", loading);
                vp.dispose();
            }
        };
    }, [canvasRef, containerRef]);

    return (
        <div ref={containerRef} id="viewer-main" className="viewer">
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
