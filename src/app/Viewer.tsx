"use client";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Region } from "../components";
import { ModelProvider, OutlinerProvider } from "../context";
import { Viewport } from "../lib";
import { ProjectPanel } from "./panels/project";
import "./style.scss";
import { Toolbar } from "./toolbar";

export interface IOutletContenxt {
    viewport: Viewport;
}

export const Viewer = () => {
    const [viewport, setViewport] = useState<Viewport>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let vp: Viewport;
        if (canvasRef) {
            if (canvasRef.current) {
                vp = new Viewport(canvasRef.current);
                setViewport(vp);
            }
        }

        return () => {
            if (vp) {
                console.log("disposed viewport");
                vp.dispose();
            }
        };
    }, [canvasRef]);

    return (
        <div className="viewer">
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
